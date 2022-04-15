import { AppBar, Button, Container, Grid, IconButton, MenuList, Paper, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddItemForm from './AddItemForm';
import './App.css';
import { AppStateType } from './state/store';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { addTodoListAC, changeTodoListFilterAC,changeTodoListTitleAC, removeTodoListAC } from './state/todoLists-reducer';
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
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {


   
    const todoLists = useSelector<AppStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    function removeTask(id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId)
        dispatch(action) 
    }

    function changeFilter(value: FilterValueType, todoListId: string) {
        const action = changeTodoListFilterAC(todoListId, value)
        dispatch(action)    
    }

    function addTask(title: string, todoListId: string) {
        const action = addTaskAC(title, todoListId)
        dispatch(action)
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(id, isDone, todoListId)
        dispatch(action)
    }

    function removeTodoList(todoListId: string) {
        const action = removeTodoListAC(todoListId)
        dispatch(action)
         
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title)
        dispatch(action)
    
    }
    function changeTaskTitle(id: string, newValue: string, todoListId: string) {
        const action = changeTaskTitleAC(id, newValue, todoListId)
        dispatch(action)
    }
    function changeTodoListTitle(newTitle: string, todoListId: string) {
        const action = changeTodoListTitleAC(todoListId, newTitle)
        dispatch(action)
    }

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <MenuList />
                    </IconButton>
                    <Typography variant='h6'>
                        TodoList
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
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

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                <TodoList
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
                                </Paper>
                            </Grid>

                        })
                    }
                </Grid>


            </Container>


        </div>
    );
}



export default AppWithRedux;
