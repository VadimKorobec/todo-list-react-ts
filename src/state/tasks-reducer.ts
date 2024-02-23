import { nanoid } from "nanoid";
import { TasksStateType } from "../App";
import {
  AddTodoListActionType,
  RemoveTodoListActionType,
} from "./todoLists-reducer";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todoListId: string;
  taskId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todoListId: string;
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todoListId: string;
  taskId: string;
  isDone: boolean;
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  todoListId: string;
  taskId: string;
  title: string;
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodoListActionType
  | RemoveTodoListActionType;

export const tasksReducer = (
  state: TasksStateType,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = state[action.todoListId];
      let newTasks = tasks.filter((item) => item.id !== action.taskId);
      stateCopy[action.todoListId] = newTasks;
      return stateCopy;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todoListId];
      const newTask = { id: nanoid(), title: action.title, isDone: false };
      const newTasks = [...tasks, newTask];
      stateCopy[action.todoListId] = newTasks;
      return stateCopy;
    }
    case "CHANGE-TASK-STATUS": {
      const stateCopy = { ...state };
      let tasks = stateCopy[action.todoListId];
      let task = tasks.find((item) => item.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;
      }
      return stateCopy;
    }
    case "CHANGE-TASK-TITLE": {
      const stateCopy = { ...state };
      let tasks = stateCopy[action.todoListId];
      let task = tasks.find((item) => item.id === action.taskId);
      if (task) {
        task.title = action.title;
      }
      return stateCopy;
    }
    case "ADD-TODOLIST": {
      const stateCopy = { ...state };
      stateCopy[action.todoListId] = [];
      return stateCopy;
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    default:
      throw new Error("I don't know, sorry");
  }
};

export const removeTaskAC = (
  taskId: string,
  todoListId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", todoListId, taskId };
};

export const addTaskAC = (
  title: string,
  todoListId: string
): AddTaskActionType => {
  return { type: "ADD-TASK", title, todoListId };
};

export const changeTaskStatusAC = (
  taskId: string,
  todoListId: string,
  isDone: boolean
): ChangeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", taskId, todoListId, isDone };
};

export const changeTaskTitleAC = (
  taskId: string,
  todoListId: string,
  title: string
): ChangeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", taskId, todoListId, title };
};
