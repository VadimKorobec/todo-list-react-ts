import { combineReducers, createStore } from "redux";
// import { TasksStateType, TodoListType } from "../AppWithReducers";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

// type AppRootState = {
//     todoLists:TodoListType[]
//     tasks:TasksStateType,
// }

type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)