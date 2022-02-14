// External imports
import React from 'react';

// Internal imports
import './tool-bar.scss';

type ToolBarProps = {
  children: React.ReactNode
}

const ToolBar = ({ children }: ToolBarProps) => {

  return (
    <div className={'tool-bar'}>
      {children}
    </div>
  );
};

export default ToolBar;
