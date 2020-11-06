import React from 'react';

import Activity from './Activity';


export default {
  component: Activity,
  title: 'Activity',
};

const Template = (args) => {
    return(
        <Activity {...args} />
    )
}

export const Default = Template.bind({});
Default.args = {
  
};

export const Filled = Template.bind({});
Filled.args = {
    categoryid: 'category1',
    activityid: 'activity1',
    short: 'pr'
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true
};
