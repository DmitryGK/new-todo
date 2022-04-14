import {AddTodoListAC, ChangeTodoListFilterActionCreator, ChangeTodoListTitleActionCreator, RemoveTodoListAC, todoListsReducer} from './todoLists-reducer';
import {v1} from 'uuid';
import { FilterValueType, TodoListType } from "../App";



test('correct todoList should be removed', () => {
   let todoListId1 = v1();
   let todoListId2 = v1();

   const startState: Array<TodoListType> = [
       {id: todoListId1, title: "What to learn", filter: "all"},
       {id: todoListId2, title: "What to buy", filter: "all"}
   ]

   const endState = todoListsReducer(startState, RemoveTodoListAC(todoListId1))

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todoListId2);
});


test('correct todoList should be added', () => {
    
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodoListTitle = 'New TodoList'

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, AddTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState[0].filter).toBe('all')

})

test('correct todoList should change its name', () => {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodoListTitle = 'New TodoList'

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    

    const endState = todoListsReducer(startState, ChangeTodoListTitleActionCreator(todoListId2, newTodoListTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter todoList should be changed', () => {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let newFilter: FilterValueType = 'completed'

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, ChangeTodoListFilterActionCreator(todoListId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})