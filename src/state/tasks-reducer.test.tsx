import { TasksStateType } from "../App"
import { tasksReducer } from "./tasks-reducer"


test('correct task should be deleted from correct array', () => {
    
    const startState: TasksStateType = {
        'todoListId1':[
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todoListId2':[
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTaskAC('2', 'todoListId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todoListId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todoListId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
     });
     
})