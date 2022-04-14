import { TasksStateType } from "../App";

export type removeTaskActionCreatorType = {
    type: 'REMOVE-TASK'
    id: string
    todoListId: string
}

type ActionsType = 
    removeTaskActionCreatorType


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let todoListTasks = tasks[action.todoListId]       
               return state
        case '':
            return state
            default :
            throw new Error ("I dom't understand this action type") 
    }
}