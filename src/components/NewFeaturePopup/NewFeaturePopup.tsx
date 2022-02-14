// External imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Internal imports
import './new-feature-popup.scss';
import { ReactComponent as Close } from '../../svgIcons/close.svg';
import { useStoreActions } from '../../store/hookSetup';
import { setPopupViewed } from './helpers';

const NewFeaturePopup = () => {
  // Store actions
  const setFeaturePopupViewed = useStoreActions((actions) => actions.settings.setFeaturePopupViewed);

  const handleClose = () => {
    setFeaturePopupViewed({ featurePopupViewed: true });
    setPopupViewed();
  };

  return (
    <div  className={'new-feature-popup__container'}>
      <div className={'new-feature-popup'}>
        <p>
                    New Daily analytics available.
        </p>
        <NavLink onClick={setPopupViewed} style={{ textDecoration: 'none' }} to={'/analytics'}>Check out</NavLink>
      </div>

      <div className={'new-feature-popup__header'}>
        <Close className={'close-icon'} onClick={handleClose} />
      </div>
    </div>
  );
};

export default NewFeaturePopup;
