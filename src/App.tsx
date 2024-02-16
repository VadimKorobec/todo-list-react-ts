import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { TaskType, TodoList } from "./components/TodoList";
import { AddItemForm } from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: TaskType[];
};

const todoListId1 = nanoid();
const todoListId2 = nanoid();

export const App = () => {
  const [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todoListId1]: [
      { id: "1", title: "CSS&HTML", isDone: false },
      { id: "2", title: "JS", isDone: false },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Redux", isDone: false },
    ],
    [todoListId2]: [
      { id: "1", title: "Milk", isDone: false },
      { id: "2", title: "Bread", isDone: false },
    ],
  });
  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    { id: todoListId1, title: "Biba", filter: "all" },
    { id: todoListId2, title: "Boba", filter: "all" },
  ]);

  const handleAddTask = (title: string, todoListId: string) => {
    let task = { id: nanoid(), title, isDone: false };
    let tasks = tasksObj[todoListId];
    let newTasks = [...tasks, task];
    tasksObj[todoListId] = newTasks;
    setTasksObj({ ...tasksObj });
  };

  const handleDeleteTask = (id: string, todoListId: string) => {
    let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter((item) => item.id !== id);
    tasksObj[todoListId] = filteredTasks;
    setTasksObj({ ...tasksObj });
  };

  const handleFilterTasks = (value: FilterValuesType, id: string) => {
    let todoList = todoLists.find((item) => item.id === id);
    if (todoList) {
      todoList.filter = value;
      setTodoLists((prevState) => [...prevState]);
    }
  };

  const handleChangeStatus = (
    id: string,
    isDone: boolean,
    todoListId: string
  ) => {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((item) => item.id === id);
    if (task) {
      task.isDone = !isDone;
      setTasksObj({ ...tasksObj });
    }
  };

  const handleRemoveTodoList = (todoListId: string) => {
    let filteredTodoList = todoLists.filter((item) => item.id !== todoListId);
    setTodoLists(filteredTodoList);
    delete tasksObj[todoListId];
    setTasksObj({ ...tasksObj });
  };

  const handleAddTodoList = (title: string) => {
    let todoList: TodoListType = {
      id: nanoid(),
      filter: "all",
      title: title,
    };
    setTodoLists([...todoLists, todoList]);
    setTasksObj({ ...tasksObj, [todoList.id]: [] });
  };

  const handleChangeTaskTitle = (
    id: string,
    newTitle: string,
    todoListId: string
  ) => {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((item) => item.id === id);
    if (task) {
      task.title = newTitle;
      setTasksObj({ ...tasksObj });
    }
  };

  return (
    <div className="App">
      <AddItemForm addItem={handleAddTodoList} />
      {todoLists.map(({ id, title, filter }) => {
        let tasksForTodoList = tasksObj[id];
        if (filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter(
            (item) => item.isDone === true
          );
        }
        if (filter === "active") {
          tasksForTodoList = tasksForTodoList.filter(
            (item) => item.isDone === false
          );
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
            removeTodoList={handleRemoveTodoList}
            changeTaskTitle={handleChangeTaskTitle}
          />
        );
      })}
    </div>
  );
};
