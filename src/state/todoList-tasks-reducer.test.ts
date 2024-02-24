import { TasksStateType, TodoListType } from "../App";
import { tasksReducer } from "./tasks-reducer";
import { AddTodoListAC, todoListsReducer } from "./todoLists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListState: TodoListType[] = [];

    const action = AddTodoListAC('new todoList');

    const endTaskState = tasksReducer(startTasksState, action);
    const endTodoListsState = todoListsReducer(startTodoListState, action);

    const keys = Object.keys(endTaskState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodoLists).toBe(action.todoListId);

})