import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TodoList } from './TodoList';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {


    let [tasks, setTasks] = useState([
        { id: v1(), title: 'dkjhfjkhd', isDone: false },
        { id: v1(), title: 'dkjhfjkhd', isDone: true },
        { id: v1(), title: 'fdf', isDone: false }
    ])
    
    let [filter, setFilter] = useState<FilterValueType>('all')


    let tasksForTodoList = tasks
    if(filter === 'active'){
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if(filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

   
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    function addTask (title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    function changeStatus (id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if(task){
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <TodoList
                title={'What to do'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}



export default App;
