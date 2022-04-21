import { Meta, Story } from "@storybook/react";
import React from "react";
import AppWithRedux from "./AppWithRedux";
import { ReduxStoreProviderDecorator } from "./stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'TodoList/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator] 
} as Meta

const Template: Story = (args) => <AppWithRedux {...args}/>

export const AppWithReduxExample = Template.bind({})
AppWithReduxExample.args={}