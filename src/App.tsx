import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { TaskType, TodoList } from "./components/TodoList";
import todos from "./components/todos.json";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>(todos);
  const [filter, setFilter] = useState<FilterValuesType>("all");
  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    { id: nanoid(), title: "Biba", filter: "all" },
    { id: nanoid(), title: "Boba", filter: "all" },
  ]);

  const handleAddTask = (title: string) => {
    setTasks((prevState) => [
      ...prevState,
      { id: nanoid(), title, isDone: false },
    ]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevState) => prevState.filter((item) => item.id !== id));
  };

  const handleFilterTasks = (value: FilterValuesType, id: string) => {
    let todoList = todoLists.find(item => item.id === id)
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  };

  const handleChangeStatus = (id: string, isDone: boolean) => {
    let task = tasks.find((item) => item.id === id);
    if (task) {
      task.isDone = !isDone;
    }
    setTasks([...tasks]);
  };

  return (
    <div className="App">
      {todoLists.map(({ id, title, filter }) => {
        let tasksForTodoList = tasks;
        if (filter === "completed") {
          tasksForTodoList = tasks.filter((item) => item.isDone === true);
        }
        if (filter === "active") {
          tasksForTodoList = tasks.filter((item) => item.isDone === false);
        }
        return (
          <TodoList
            key={id}
            id={id}
            title={title}
            tasks={tasksForTodoList}
            onDelete={handleDeleteTask}
            onFilter={handleFilterTasks}
            addTask={handleAddTask}
            onStatus={handleChangeStatus}
            filter={filter}
          />
        );
      })}
    </div>
  );
};
