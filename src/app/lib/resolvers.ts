import { Resolvers } from "../../generated/graphql";
import { PrismaClient } from "@prisma/client";
import redis from "./redis";

const prisma = new PrismaClient();

interface Task {
    id: string;  // change "id" to string to match GraphQL schema
    title: string;
    description?: string;
}

export const resolvers: Resolvers = {
    Query: {
        tasks: async () => {
            // check redis cache first
            const cachedTasks = await redis.get("tasks");
            if (cachedTasks) {
                //console.log("cached tasks found!");
                return JSON.parse(cachedTasks);
            }
            // otherwise get all tasks from the database
            const tasks = await prisma.task.findMany();
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
        createTask: async (_parent, {title, description}) => {
            const newTask = await prisma.task.create({
                data: {
                    title,
                    description,
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
