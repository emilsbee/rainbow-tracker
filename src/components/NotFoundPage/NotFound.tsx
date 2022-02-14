// External imports
import { NavLink } from 'react-router-dom';
import React from 'react';

const NotFound = () => (
  <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        This page doesn't exist.
    <NavLink to="/">Go home</NavLink>
  </div>
);

export default NotFound;
