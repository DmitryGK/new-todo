import React from "react"
import { Provider } from "react-redux"
import { combineReducers, createStore } from "redux"
import { v1 } from "uuid"
import { AppStateType, store } from "../../state/store"
import { tasksReducer } from "../../state/tasks-reducer"
import { todoListsReducer } from "../../state/todoLists-reducer"


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [
        { id: 'todoListId1', title: 'What to learn', filter: 'all' },
        { id: 'todoListId2', title: 'What to buy', filter: 'all' }
    ],
    tasks: {
        ['todoListId1']: [
            { id: v1(), title: 'ggg', isDone: true },
            { id: v1(), title: 'hhh', isDone: false }
        ],
        ['todoListId2']: [
            { id: v1(), title: 'aaa', isDone: true },
            { id: v1(), title: 'sss', isDone: false }
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType);


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}