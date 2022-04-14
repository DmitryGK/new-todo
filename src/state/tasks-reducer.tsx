import { v1 } from "uuid";
import { TasksStateType, TaskType } from "../App";

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
type ActionsType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
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
            case 'CHANGE-TASK-STATUS' :
                let stateCopy = {...state}
                let currentTodo = stateCopy[action.todoListId]
                let currentTask = currentTodo.find( t => t.id === action.taskId)
                if(currentTask){
                    currentTask.isDone = action.isDone
                }
                return {
                    ...state,
                }

        default:
            throw new Error("I dom't understand this action type")
    }
}

export const removeTaskAC = (taskId: string, todoListId: string):RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todoListId }
}
export const addTaskAC = (taskTitle: string, todoListId: string): AddTaskActionType => {
    return { type: "ADD-TASK", taskTitle, todoListId }
}
export const changeTaskStatusAC = ( taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId}
}