import { TasksStateType } from "../App";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./tasks-reducer";
import { AddTodoListAC, RemoveTodoListAC } from "./todoLists-reducer";

test("correct task should be deleted from correct array", () => {
  const startState: TasksStateType = {
    todoListId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todoListId2: [
      { id: "1", title: "Bread", isDone: false },
      { id: "2", title: "Milk", isDone: true },
      { id: "3", title: "Tea", isDone: false },
    ],
  };

  const action = removeTaskAC("2", "todoListId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(2);
  expect(endState["todoListId2"].every((item) => item.id !== "2")).toBe(true);
  expect(endState["todoListId2"][0].id).toBe("1");
  expect(endState["todoListId2"][1].id).toBe("3");
});

test("correct task should be added to correct array", () => {
  const startState: TasksStateType = {
    todoListId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todoListId2: [
      { id: "1", title: "Bread", isDone: false },
      { id: "2", title: "Milk", isDone: true },
      { id: "3", title: "Tea", isDone: false },
    ],
  };

  const action = addTaskAC("juice", "todoListId2");
  const endState = tasksReducer(startState, action);

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(4);
  expect(endState["todoListId2"][0].id).toBeDefined();
  expect(endState["todoListId2"][0].title).toBe("juice");
  expect(endState["todoListId2"][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
  const startState: TasksStateType = {
    todoListId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todoListId2: [
      { id: "1", title: "Bread", isDone: false },
      { id: "2", title: "Milk", isDone: true },
      { id: "3", title: "Tea", isDone: false },
    ],
  };

  const action = changeTaskStatusAC("2", "todoListId2", false);
  const endState = tasksReducer(startState, action);

  expect(endState["todoListId2"][1].isDone).toBe(false);
  expect(endState["todoListId1"][1].isDone).toBe(true);
});

test("title of specified task should be changed", () => {
  const startState: TasksStateType = {
    todoListId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todoListId2: [
      { id: "1", title: "Bread", isDone: false },
      { id: "2", title: "Milk", isDone: true },
      { id: "3", title: "Tea", isDone: false },
    ],
  };

  const action = changeTaskTitleAC("2", "todoListId2", 'Twix');
  const endState = tasksReducer(startState, action);

  expect(endState["todoListId2"][1].title).toBe('Twix');
  expect(endState["todoListId1"][1].title).toBe('JS');
});

test("new array should be added when new todoList is added", () => {
  const startState: TasksStateType = {
    todoListId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todoListId2: [
      { id: "1", title: "Bread", isDone: false },
      { id: "2", title: "Milk", isDone: true },
      { id: "3", title: "Tea", isDone: false },
    ],
  };

  const action = AddTodoListAC('new todoList');
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState)
  const newKey = keys.find(item => item !== 'todoListId1' && item !== 'todoListId2');
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([])
});

test("property with todoList should be deleted", () => {
  const startState: TasksStateType = {
    todoListId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todoListId2: [
      { id: "1", title: "Bread", isDone: false },
      { id: "2", title: "Milk", isDone: true },
      { id: "3", title: "Tea", isDone: false },
    ],
  };

  const action = RemoveTodoListAC("rodoListId2");
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  

  expect(keys.length).toBe(1);
  expect(endState['tpdpListId2']).toBeUndefined();
});

