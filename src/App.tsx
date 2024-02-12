import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { TaskType, TodoList } from "./components/TodoList";
import todos from "./components/todos.json";
import { Input } from "./components/Input";

export type FilterValuesType = "all" | "active" | "completed";

export const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>(todos);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  const handleAddTask = (title: string) => {
    // let newTask = { id: nanoid(), title: "New Task", isDone: false }
    // let newTasks = [...tasks, newTask]
    // setTasks(newTasks)
    setTasks((prevState) => [
      ...prevState,
      { id: nanoid(), title, isDone: false },
    ]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevState) => prevState.filter((item) => item.id !== id));
  };

  const handleFilterTasks = (value: FilterValuesType) => {
    setFilter(value);
  };

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((item) => item.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((item) => item.isDone === false);
  }

  return (
    <div className="App">
      <TodoList
        title="Code"
        tasks={tasksForTodoList}
        onDelete={handleDeleteTask}
        onFilter={handleFilterTasks}
        addTask={handleAddTask}
      />
      <Input />
    </div>
  );
};
