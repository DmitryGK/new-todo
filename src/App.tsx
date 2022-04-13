import React, { useState } from 'react';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import './App.css';
import { TodoList } from './TodoList';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {


    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        { id: todoListId1, title: 'What to learn', filter: 'all' },
        { id: todoListId2, title: 'What to buy', filter: 'all' }
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            { id: v1(), title: 'ggg', isDone: true },
            { id: v1(), title: 'hhh', isDone: false }
        ],
        [todoListId2]: [
            { id: v1(), title: 'aaa', isDone: true },
            { id: v1(), title: 'sss', isDone: false }
        ]
    })

    

    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id === id)
        setTasks({ ...tasks })
    }

    function changeFilter(value: FilterValueType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function addTask(title: string, todoListId: string) {
        let task = { id: v1(), title: title, isDone: false }
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [task, ...todoListTasks]
        setTasks({ ...tasks })
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({ ...tasks })
        }
    }

    function removeTodoList (todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        let newTodoListId = v1()
        let newTodoList: TodoListType = {id: newTodoListId, title: title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }
    function changeTaskTitle (id: string, newValue: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === id)
        if(task) {
            task.title = newValue
            setTasks({...tasks})
        }
    }
    function changeTodoListTitle (newTitle: string, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if(todoList){
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map(tl => {
                    let allTodoListTasks = tasks[tl.id]
                    let tasksForTodoList = allTodoListTasks
                    if (tl.filter === 'active') {
                        tasksForTodoList = allTodoListTasks.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = allTodoListTasks.filter(t => t.isDone === true)
                    }

                    return <TodoList
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        changeTodoTitle={changeTodoListTitle}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeStatus}
                        removeTodoList={removeTodoList}
                        filter={tl.filter}
                        todoListId={tl.id}
                    />
                })
            }

        </div>
    );
}



export default App;
