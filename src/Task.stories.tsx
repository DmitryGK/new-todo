import { Meta, Story } from "@storybook/react";
import {action} from '@storybook/addon-actions'

export default {
    title: 'TodoList/Task',
    component: Task
} as Meta

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallBack = action('Remove Button inside Task clicked')

const Template: Story<TaskPropsType> = (args) => <Task 
{...args}/>
const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallBack
} 

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'JS'},
    todoListId: 'todoListId1'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: false, title: 'JS'},
    todoListId: 'todoListId1'
}