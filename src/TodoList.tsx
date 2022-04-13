import { IconButton, Button, Checkbox,} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent } from 'react';
import AddItemForm from './AddItemForm';
import { FilterValueType, TaskType } from './App';
import EditableSpan from './EditableSpan';


type PropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValueType
    todoListId: string
    changeTaskTitle: (id: string, newValue: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoTitle: (newTitle: string, todoListId: string) => void
}

export const TodoList = (props: PropsType) => {



    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }

    const removeTodoListHandler = () => props.removeTodoList(props.todoListId)
    const onAllClickHandler = () => { props.changeFilter('all', props.todoListId) }
    const onActiveClickHandler = () => { props.changeFilter('active', props.todoListId) }
    const onCompleteClickHandler = () => { props.changeFilter('completed', props.todoListId) }
    const changeTodoTitle = (newTitle: string) => { props.changeTodoTitle(newTitle, props.todoListId) }
    return (
        <div>

            <h3>
                <EditableSpan value={props.title} onChange={changeTodoTitle} />
                <IconButton onClick={removeTodoListHandler}>
                    <Delete />
                </IconButton>

            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map(t => {

                        const onClickHandler = () => { props.removeTask(t.id, props.todoListId) }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newIsDoneValue, props.todoListId)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.todoListId)
                        }
                        return <div key={t.id} className={t.isDone ? 'is-done' : ''}>

                            <Checkbox
                                color='primary'
                                checked={t.isDone}
                                onChange={onChangeHandler} />
                            <EditableSpan value={t.title} onChange={onChangeTitleHandler} />
                            <IconButton onClick={onClickHandler}>
                                <Delete />
                            </IconButton>
                        </div>
                    })
                }
            </ul>
            <div>
                <Button
                    color={'default'}
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}>All</Button>
                <Button
                    color={'primary'}
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}>Active</Button>
                <Button
                    color={'secondary'}
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompleteClickHandler}>Completed</Button>
            </div>
        </div>
    )
}
