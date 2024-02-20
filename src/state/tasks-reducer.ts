import { TasksStateType } from "../App";

export type ActionType1 = {
  type: "1";
  id: string;
};

export type ActionType2 = {
  type: "2";
  title: string;
};

type ActionsType = ActionType1 | ActionType2;

export const tasksReducer = (
  state: TasksStateType,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "1": {
      return { ...state };
    }
    case "2": {
      return { ...state };
    }
    default:
      throw new Error("I don't know, sorry");
  }
};

export const action1AC = (todoListId: string): ActionType1 => {
  return { type: "1", id: todoListId };
};

export const action2AC = (newTitle: string): ActionType2 => {
  return { type: "2", title: newTitle };
};
