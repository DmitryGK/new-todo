import React, { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {


    let [tasks, setTasks] = useState([
        { id: 1, title: 'dkjhfjkhd', isDone: false },
        { id: 2, title: 'dkjhfjkhd', isDone: true },
        { id: 3, title: 'fdf', isDone: false }
    ])

    let [filter, setFilter] = useState<FilterValueType>('all')
    let tasksForTodoList = tasks
    if(filter === 'active'){
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if(filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

   
    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList
                title={'What to do'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}



export default App;
