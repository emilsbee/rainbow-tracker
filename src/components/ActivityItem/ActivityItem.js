// External imports
import React, { useState } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy'

// Internal imports


export default ({activity}) => {
  
  return (
    <div style={{"display":"inline-block"}}>
    {activity}
    </div>
  );
};
