// External imports
import React from 'react';

// Internal imports
import './loading-page.scss';
import { ReactComponent as Spinner } from '../../svgIcons/spinner.svg';

const LoadingPage = () => (
  <div className="loader">
    <Spinner style={{ height: '6rem', width: '6rem' }} />
  </div>
);

export default LoadingPage;
