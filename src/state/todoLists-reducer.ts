import { FilterValueType } from './../App';
import { TodoListType } from "../App";
import { v1 } from "uuid";


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValueType
    id: string
}

type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

const InitialState: Array<TodoListType> = []

export const todoListsReducer = (state: Array<TodoListType> = InitialState, action: ActionType): Array<TodoListType> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':

            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':

            let newTodoListId = action.todoListId
            let newTodoList: TodoListType = { id: newTodoListId, title: action.title, filter: 'all' }
            return [newTodoList, ...state]

        case 'CHANGE-TODOLIST-TITLE':

            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            } else {
                return state
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':

            let todoListForFilter = state.find(tl => tl.id === action.id)
            if (todoListForFilter) {
                todoListForFilter.filter = action.filter
            }
            return [...state]

        default:
            return state

    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todoListId}
}

export const addTodoListAC= (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title, todoListId: v1()}
}

export const changeTodoListTitleAC = (todoListId: string, title: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title}
}

export const changeTodoListFilterAC = (todoListId: string, filter: FilterValueType): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter}
}