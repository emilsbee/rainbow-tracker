import React from 'react';

import Category from './Category';
import * as Activity from '../Activity/Activity.stories'

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
  
};

export const Filled = Template.bind({});
Filled.args = {
    color: 'red',
    categoryid: 'category1',
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true
};
