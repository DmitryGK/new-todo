import { TasksStateType } from "../App"
import { addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer } from "./tasks-reducer"


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

test('correct task should be added to correct array', () => {

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

    const action = addTaskAC('juice', 'todoListId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(4)
    expect(endState['todoListId2'][0].id).toBeDefined()
    expect(endState['todoListId2'][0].title).toBe('juice')
    expect(endState['todoListId2'][0].isDone).toBe(false)


})

test('status of specified task should be changed', () => {

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

    const action = changeTaskStatusAC('2', false, 'todoListId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId2'].length).toBe(3)
    expect(endState['todoListId2'][1].isDone).toBe(false)
    expect(endState['todoListId2'][0].isDone).toBe(false)
    expect(endState['todoListId2'][1].title).toBe('milk')
    expect(endState['todoListId1'][1].isDone).toBe(true)


})

test('title of current task should be changed', () => {
    
})