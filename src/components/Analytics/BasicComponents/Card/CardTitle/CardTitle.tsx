// External imports
import React from 'react';

// Internal imports
import './card-title.scss';

type CardTitleProps = {
  title: string
}

const CardTitle:React.FC<CardTitleProps> = ({ title }) => {

  return (
    <h3 className={'analytics-card-title'}>
      {title}
    </h3>
  );
};

export default CardTitle;
