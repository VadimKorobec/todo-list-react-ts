import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { TaskType, TodoList } from "./components/TodoList";
import todos from "./components/todos.json";

export type FilterValuesType = "all" | "active" | "completed";

export const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>(todos);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  const handleAddTask = (title: string) => {
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

  const handleChangeStatus = (id: string, isDone: boolean) => {
    let task = tasks.find((item) => item.id === id);
    if (task) {
      task.isDone = !isDone;
    }
    setTasks([...tasks]);
  };

  return (
    <div className="App">
      <TodoList
        title="Tasks"
        tasks={tasksForTodoList}
        onDelete={handleDeleteTask}
        onFilter={handleFilterTasks}
        addTask={handleAddTask}
        onStatus={handleChangeStatus}
        filter={filter}
      />
    </div>
  );
};
