import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { TaskType, TodoList } from "./components/TodoList";
import { AddItemForm } from "./components/AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

const todoListId1 = nanoid();
const todoListId2 = nanoid();

export const AppWithRedux = () => {
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

  const handleChangeTodoListTitle = (id: string, newTitle: string) => {
    let todoList = todoLists.find((item) => item.id === id);
    if (todoList) {
      todoList.title = newTitle;
      setTodoLists([...todoLists]);
    }
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "30px" }}>
          <AddItemForm addItem={handleAddTodoList} />
        </Grid>
        <Grid container spacing={10}>
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
              <Grid key={id} item>
                <Paper elevation={3} style={{ padding: "20px" }}>
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
                    changeTodoListTitle={handleChangeTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};
