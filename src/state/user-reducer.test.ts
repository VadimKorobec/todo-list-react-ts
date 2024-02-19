import { userReducer } from "./user-reducer";

test("user reducer should increment only age", () => {
  const startState = { age: 40, childrenCount: 1, name: "Vadim" };

  const endState = userReducer(startState, { type: "INCREMENT-AGE" });

  expect(endState.age).toBe(41);
  expect(endState.childrenCount).toBe(1);
});

test("user reducer should increment only children", () => {
  const startState = { age: 40, childrenCount: 1, name: "Vadim" };

  const endState = userReducer(startState, {
    type: "INCREMENT-CHILDREN-COUNT",
  });

  expect(endState.childrenCount).toBe(2);
  expect(endState.age).toBe(40);
});

test("user reducer should change name of user", () => {
  const startState = { age: 40, childrenCount: 1, name: "Vadim" };
  const newName = 'Denis'

  const endState = userReducer(startState, {
    type: "CHANGE-NAME",newName:newName
  });

  expect(endState.name).toBe(newName);
  
});
