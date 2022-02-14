/**
 * Called when user interacts with the feature popup for the first time.
 */
export const setPopupViewed = ():void => {
  localStorage.setItem('feature-popup', 'true');
};

/**
 * Returns whether user has seen latest feature popup.
 */
export const getPopupViewed = ():boolean => {
  const viewed = localStorage.getItem('feature-popup');

  if (viewed == null) {
    return false;
  } else return viewed === 'true';
};
