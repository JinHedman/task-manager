import { PrismaClient } from "@prisma/client";
import redis from "./redis";

const prisma = new PrismaClient();

interface Task {
    id: string;  // change "id" to string to match GraphQL schema
    title: string;
    description?: string;
}
interface User {
    id: string;
    name: string;
    email: string;
}
interface Context {
    user?: User;
}

export const resolvers = {
    Query: {
        tasks: async (_parent: any,_args: any, context: Context) => {
            // check if user is logged in
            const { user } = context;
            if (!user) {
                throw new Error("Not authenticated");
            }
            // check redis cache first
            const cachedTasks = await redis.get("tasks");
            if (cachedTasks) {
                console.log("cached tasks found!");
                return JSON.parse(cachedTasks);
            }
            // otherwise get all tasks from the database where userId matches
            const tasks = await prisma.task.findMany(
                {
                    where: {
                        userId: user.id,
                    },
                },
            );
            // cache tasks in redis
            await redis.set("tasks", JSON.stringify(tasks));
            // convert id to string to match GraphQL schema
            return tasks.map((task) => ({
                ...task, 
                id: task.id.toString(),
            }));  
        },
    },
    Mutation: {
        // create new task
        createTask: async (_parent: any, { title, description }: { title: string; description: string }, context: Context) => {
            // check if user is logged in            
            const { user } = context;
            if (!user) {
                throw new Error("Not authenticated");
            }
            const newTask = await prisma.task.create({
                data: {
                    title,
                    description,
                    userId: user.id,
                },
            });
            // clear cache
            await redis.del("tasks");
            return{...newTask,
                // convert id to string to match GraphQL schema
                id: newTask.id.toString(),
            };
        },
    },
};
