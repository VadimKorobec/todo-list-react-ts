import {
  AddTodoListAC,
  ChangeTodoListTitleAC,
  RemoveTodoListAC,
  todoListsReducer,
} from "./todoLists-reducer";
import { FilterValuesType, TodoListType } from "../App";
import { nanoid } from "nanoid";

test("correct todoList should be removed", () => {
  let todoListId1 = nanoid();
  let todoListId2 = nanoid();

  const startState: TodoListType[] = [
    { id: todoListId1, title: "Biba", filter: "all" },
    { id: todoListId2, title: "Boba", filter: "all" },
  ];

  const endState = todoListsReducer(startState, RemoveTodoListAC(todoListId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("correct todoList should be added", () => {
  let todoListId1 = nanoid();
  let todoListId2 = nanoid();

  let newTodoListTitle = "New TodoList";

  const startState: TodoListType[] = [
    { id: todoListId1, title: "BIba", filter: "all" },
    { id: todoListId2, title: "Boba", filter: "all" },
  ];

  const endState = todoListsReducer(
    startState,
    AddTodoListAC(newTodoListTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle);
  expect(endState[2].filter).toBe("all");
});

test("correct todoList should change its name", () => {
  let todoListId1 = nanoid();
  let todoListId2 = nanoid();

  let newTodoListTitle = "New TodoList";

  const startState: TodoListType[] = [
    { id: todoListId1, title: "BIba", filter: "all" },
    { id: todoListId2, title: "Boba", filter: "all" },
  ];

  const endState = todoListsReducer(
    startState,
    ChangeTodoListTitleAC(todoListId2, newTodoListTitle)
  );

  expect(endState[0].title).toBe("Biba");
  expect(endState[1].title).toBe(newTodoListTitle);
});

test("correct filter of todoList should be changed", () => {
  let todoListId1 = nanoid();
  let todoListId2 = nanoid();

  let newFilter: FilterValuesType = "completed";

  const startState: TodoListType[] = [
    { id: todoListId1, title: "Biba", filter: "all" },
    { id: todoListId2, title: "Boba", filter: "all" },
  ];

  const action = {
    type: "CHANGE-TODOLIST-FILTER" as const,
    id: todoListId2,
    filter: newFilter,
  };

  const endState = todoListsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
