import { nanoid } from "nanoid";
import { FilterValuesType, TodoListType } from "../App";

export type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodoListActionType = {
  type: "ADD-TODOLIST";
  title: string;
};

export type ChangeTodoListTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListFilterActionType
  | ChangeTodoListTitleActionType;

export const todoListsReducer = (
  state: TodoListType[],
  action: ActionsType
): TodoListType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((item) => item.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [...state, { id: nanoid(), title: action.title, filter: "all" }];
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todoList = state.find((item) => item.id === action.id);
      if (todoList) {
        todoList.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todoList = state.find((item) => item.id === action.id);
      if (todoList) {
        todoList.filter = action.filter;
      }
      return [...state];
    }

    default:
      throw new Error("I don't know, sorry");
  }
};

export const RemoveTodoListAC = (
  todoListId: string
): RemoveTodoListActionType => {
  return { type: "REMOVE-TODOLIST", id: todoListId };
};

export const AddTodoListAC = (newTitle: string): AddTodoListActionType => {
  return { type: "ADD-TODOLIST", title: newTitle };
};

export const ChangeTodoListTitleAC = (
  id: string,
  title: string
): ChangeTodoListTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", title: title, id: id };
};
