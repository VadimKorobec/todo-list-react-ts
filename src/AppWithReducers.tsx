import { useReducer } from "react";
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
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodoListAC,
  todoListsReducer,
} from "./state/todoLists-reducer";

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

export const AppWithReducers = () => {
  const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
  const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
    { id: todoListId1, title: "Biba", filter: "all" },
    { id: todoListId2, title: "Boba", filter: "all" },
  ]);

  const handleAddTask = (title: string, todoListId: string) => {
    const action = addTaskAC(title, todoListId);
    dispatchToTasksReducer(action);
  };

  const handleDeleteTask = (id: string, todoListId: string) => {
    const action = removeTaskAC(id, todoListId);
    dispatchToTasksReducer(action);
  };

  const handleFilterTasks = (value: FilterValuesType, id: string) => {
    dispatchTodoLists(ChangeTodoListFilterAC(id, value));
  };

  const handleChangeStatus = (
    id: string,
    isDone: boolean,
    todoListId: string
  ) => {
    const action = changeTaskStatusAC(id, todoListId, isDone);
    dispatchToTasksReducer(action);
  };

  const handleRemoveTodoList = (todoListId: string) => {
    const action = RemoveTodoListAC(todoListId);
    dispatchToTasksReducer(action);
    dispatchTodoLists(action);
  };

  const handleAddTodoList = (title: string) => {
    const action = AddTodoListAC(title);
    dispatchToTasksReducer(action);
    dispatchTodoLists(action);
  };

  const handleChangeTaskTitle = (
    id: string,
    newTitle: string,
    todoListId: string
  ) => {
    dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todoListId));
  };

  const handleChangeTodoListTitle = (id: string, newTitle: string) => {
    const action = ChangeTodoListTitleAC(id, newTitle);
    dispatchTodoLists(action);
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
