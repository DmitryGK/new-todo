import React, { ChangeEvent} from 'react';
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
    const changeTodoTitle = (newTitle: string) => { props.changeTodoTitle(newTitle, props.todoListId)}
    return (
        <div>

            <h3>
                <EditableSpan value={props.title} onChange={changeTodoTitle}/>
                <button onClick={removeTodoListHandler}>x</button>
            </h3>
                <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {

                        const onClickHandler = () => { props.removeTask(t.id, props.todoListId) }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newIsDoneValue, props.todoListId)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id,newValue, props.todoListId)
                        }
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type='checkbox' checked={t.isDone} onChange={onChangeHandler} />
                            <EditableSpan value={t.title} onChange={onChangeTitleHandler}/>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompleteClickHandler}>Completed</button>
            </div>
        </div>
    )
}
