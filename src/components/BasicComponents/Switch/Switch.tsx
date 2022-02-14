// External imports
import React from 'react';

// Internal imports
import './switch.scss';

type SwitchProps = {
  onChange: (value: boolean) => void,
  value: boolean
}

const Switch:React.FC<SwitchProps> = ({ onChange, value }) => (
  <>
    <label className="toggle-switch">
      <input type="checkbox" checked={value} onChange={() => onChange(!value)} />
      <span className="switch" />
    </label>
  </>
);

export default Switch;
