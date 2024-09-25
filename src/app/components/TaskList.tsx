"use client";

import { gql, useQuery } from "@apollo/client";

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
    }
  }
`;

export default function TaskList() {
    // fetch tasks from the server
    const { loading, error, data } = useQuery(GET_TASKS);

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>Error fetching tasks: {error.message}</p>;

    // render the tasks
    return (
        <div>
        <h1>Task List</h1>
        {data?.tasks?.map((task: any) => (
            <div key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            </div>
        ))}
        </div>
    );
}
