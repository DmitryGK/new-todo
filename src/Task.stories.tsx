import { Meta, Story } from "@storybook/react";
import {action} from '@storybook/addon-actions'

export default {
    title: 'TodoList/Task',
    component: Task
} as Meta

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallBack = action('Remove Button inside Task clicked')

const Template: Story<> 