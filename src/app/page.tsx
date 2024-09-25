import TaskList from "./components/TaskList"; 
import CreateTask from "./components/CreateTask"; 

export default function Home() {
  return (
    <main>
      <TaskList />
      <CreateTask />
    </main>
  );
}
