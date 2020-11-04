import React from 'react';

import Category from './Category';


export default {
  component: Category,
  title: 'Category',
};

const Template = (args) => {
    return(
        <Category {...args} />
    )
}

export const Default = Template.bind({});
Default.args = {
  loading: false
};

export const Filled = Template.bind({});
Filled.args = {
    ...Default.args.task,
    color: 'red',
    categoryid: 'category1',
    category: 'Productive'
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true
};
