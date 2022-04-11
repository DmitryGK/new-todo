import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValueType, TaskType } from './App';


type PropsType = {
    title: string
    tasks: TaskType[]
    addTask: (title: string) => void
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
}

export const TodoList = (props: PropsType) => {

    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value) }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) { addTask() }
    }


    const onAllClickHandler = () => { props.changeFilter('all') }
    const onActiveClickHandler = () => { props.changeFilter('active') }
    const onCompleteClickHandler = () => { props.changeFilter('completed') }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const onClickHandler = () => { props.removeTask(t.id) }
                        return <li key={t.id}>
                            <input type='checkbox' checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompleteClickHandler}>Completed</button>
            </div>
        </div>
    )
}
