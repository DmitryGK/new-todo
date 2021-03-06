import { TasksStateType, TodoListType } from "../App";
import { tasksReducer } from "./tasks-reducer";
import { addTodoListAC, todoListsReducer } from "./todoLists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListType> = [];
 
    const action = addTodoListAC("new todoList");
 
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)
 
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;
 
    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodoLists).toBe(action.todoListId);
 });
 
 
 
 
 