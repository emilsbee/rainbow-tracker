import * as React from 'react';
import { Helmet } from 'react-helmet';

export const HelmetComponent: React.FC<HelmetComponentProps> = ({ tabTitle }) => (
  <Helmet>
    <title>
      {tabTitle} - Rainbow tracker
    </title>
  </Helmet>
);

type HelmetComponentProps = {
  tabTitle: string;
}
