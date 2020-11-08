// External imports
import React from 'react';

// Internal imports
import LoadingTable from './LoadingTable';


export default {
  component: LoadingTable,
  title: 'LoadingTable',
};

const Template = (args) => {
    return(
        <LoadingTable {...args} />
    )
}

export const Default = Template.bind({});
Default.args = {
  
};

