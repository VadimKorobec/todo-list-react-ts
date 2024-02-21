import { TasksStateType } from "../App";
import { addTaskAC, removeTaskAC, tasksReducer } from "./tasks-reducer";

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
    
    const action = removeTaskAC('2', 'todoListId2');

    const endState = tasksReducer(startState, action)
    
    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId2'].length).toBe(2);
    expect(endState['todoListId2'].every(item => item.id !== '2')).toBe(true)
    expect(endState['todoListId2'][0].id).toBe('1')
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
