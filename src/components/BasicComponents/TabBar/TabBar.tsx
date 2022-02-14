// External imports
import React from 'react';
import { Link } from 'react-router-dom';

// Internal imports
import './tab-bar.scss';

type TabBarProps = {
  tabs: string[],
  selectedIndex: number,
  onSelect: (selected: number) => void
}

const TabBar = ({ tabs, onSelect, selectedIndex }: TabBarProps) => {

  return (
    <div className={'tab-bar'}>
      {tabs.map((tab, index) => (
        <Link to={`/analytics/${tabs[index].toLowerCase()}`} style={{ textDecoration: 'none' }}>
          <h3
            key={tab}
            className={`tab-bar-item ${selectedIndex === index ? 'selected-item' : ''}`}
          >
            {tab}
          </h3>
        </Link>
      ))}
    </div>
  );
};

export default TabBar;
