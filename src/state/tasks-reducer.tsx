import { TasksStateType } from "../App";

type ActionsType = {

}

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case '':
            return state
        case '':
            return state
            default :
            throw new Error ("I dom't understand this action type") 
    }
}