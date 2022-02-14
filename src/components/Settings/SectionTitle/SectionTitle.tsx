// External imports
import React from 'react';

// Internal imports
import './section-title.scss';

type SectionTitleProps = {
  title:string
  viewArchived:boolean,
  setViewArchived: () => void
}

function SectionTitle({ title, viewArchived, setViewArchived }:SectionTitleProps) {

  return (
    <div id="settings-dashboard-section-title-container">
      {title}

      <div>
        <label className={'label'} htmlFor={'archived'}>View archived</label>
        <input name={'archived'} checked={viewArchived} type={'checkbox'} onChange={setViewArchived} />
      </div>
    </div>
  );
}

export default SectionTitle;
