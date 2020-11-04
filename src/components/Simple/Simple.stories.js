import React from 'react';

import { Simple } from './Simple';

export default {
  title: 'Simple button',
  component: Simple
};

const Template = (args) => <Simple {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Fart'
};

