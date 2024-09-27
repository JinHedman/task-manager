"use client";

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_TASK } from "../lib/schema";



export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createTask, { data, loading, error }] = useMutation(CREATE_TASK, {
    refetchQueries: ['GetTasks'], // refetch tasks after creating a new one
  });

  // POST task handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask({ variables: { title, description } });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      {loading && <p>Creating task...</p>}
      {error && <p>Error: {error.message}</p>}
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
}
