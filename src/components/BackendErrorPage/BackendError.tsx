// External imports
import React from 'react';

// Internal imports
import { history } from '../../routers/AppRouter';

const BackendError = () => {

  React.useEffect(() => {
    window.onload = function () {
      history.push('/');
    };
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            Internal server error. Please refresh the page in a minute.
    </div>
  );
};

export default BackendError;
