
import { nanoid } from "nanoid";
import { TasksStateType } from "../App";

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

type ActionsType = RemoveTaskActionType | AddTaskActionType;

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
      const tasks = state[action.todoListId];
      let newTasks = [
        ...tasks,
        { id: nanoid(), title: action.title, isDone: false },
      ];
      stateCopy[action.todoListId] = newTasks;
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
