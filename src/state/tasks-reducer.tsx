import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTodoListActionType, RemoveTodoListActionType } from "./todoLists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    taskTitle: string
    todoListId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todoListId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todoListId: string
}
type ActionsType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddTodoListActionType |
    RemoveTodoListActionType

const InitialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = InitialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let todoListTasks = state[action.todoListId]
            let filteredTasks = todoListTasks.filter(t => t.id !== action.taskId)

            return {
                ...state,
                [action.todoListId]: filteredTasks
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoListId]: [
                    { id: v1(), title: action.taskTitle, isDone: false },
                    ...state[action.todoListId]
                ]

            }
        case 'CHANGE-TASK-STATUS':
            let stateCopy = { ...state }
            let currentTodo = stateCopy[action.todoListId]
            let currentTask = currentTodo.find(t => t.id === action.taskId)
            if (currentTask) {
                currentTask.isDone = action.isDone
            }
            return stateCopy
        case 'CHANGE-TASK-TITLE' : 
            let newState = {...state}
            let todo = newState[action.todoListId]
            let task = todo.find(t => t.id === action.taskId)
            if(task){
                task.title = action.title
            }
            return newState
        case 'ADD-TODOLIST' :
            let copy = {...state}
            copy[action.todoListId] = []
            return copy
        case 'REMOVE-TODOLIST' :
            const mainCopy = {...state}
            delete mainCopy[action.id]
            return mainCopy
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todoListId }
}
export const addTaskAC = (taskTitle: string, todoListId: string): AddTaskActionType => {
    return { type: "ADD-TASK", taskTitle, todoListId }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId }
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todoListId }
}