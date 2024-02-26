import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todoListsReducer } from "./todoLists-reducer";
// import { TasksStateType, TodoListType } from "../AppWithReducers";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

// type AppRootState = {
//     todoLists:TodoListType[]
//     tasks:TasksStateType,
// }

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)