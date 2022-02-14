// External imports
import React from 'react';

// Internal imports
import './Toggle.scss';

type ToggleProps = {
  values: string[] | number[] | boolean[],
  activeValue: string | number | boolean,
  setActiveValue: (value: string | number | boolean) => void
}

const Toggle = ({ values, activeValue, setActiveValue }: ToggleProps) => {

  return (
    <div id="toggle-container">
      {values.map((value, index) => {

        return (
          <div
            key={index}
            onClick={() => setActiveValue(value)}
            id={value === activeValue ? 'toggle-active' : 'toggle-inactive'}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
};

export default Toggle;
