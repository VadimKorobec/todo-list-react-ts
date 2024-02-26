import { useReducer, useState } from "react";
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
import { useDispatch } from "react-redux";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodoListAC,
} from "./state/todoLists-reducer";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

export const AppWithRedux = () => {
  const todoLists = useSelector<AppRootState, TodoListType[]>(
    (state) => state.todoLists
  );
  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.tasks
  );
  
  const dispath = useDispatch();

  const handleAddTask = (title: string, todoListId: string) => {
    const action = addTaskAC(title, todoListId);
    dispath(action);
  };

  const handleDeleteTask = (id: string, todoListId: string) => {
    const action = removeTaskAC(id, todoListId);
    dispath(action);
  };

  const handleFilterTasks = (value: FilterValuesType, id: string) => {
    dispath(ChangeTodoListFilterAC(id, value));
  };

  const handleChangeStatus = (
    id: string,
    isDone: boolean,
    todoListId: string
  ) => {
    const action = changeTaskStatusAC(id, todoListId, isDone);
    dispath(action);
  };

  const handleRemoveTodoList = (todoListId: string) => {
    const action = RemoveTodoListAC(todoListId);
    dispath(action);
  };

  const handleAddTodoList = (title: string) => {
    const action = AddTodoListAC(title);
    dispath(action);
  };

  const handleChangeTaskTitle = (
    id: string,
    newTitle: string,
    todoListId: string
  ) => {
    dispath(changeTaskTitleAC(id, newTitle, todoListId));
  };

  const handleChangeTodoListTitle = (id: string, newTitle: string) => {
    const action = ChangeTodoListTitleAC(id, newTitle);
    dispath(action);
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
            let tasksForTodoList = tasks[id];
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
