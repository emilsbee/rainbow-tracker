export const getApiUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://rainbow.emils.xyz/api';
  } else {
    return 'https://rainbow-tracker-backend-dev-rhcas.ondigitalocean.app/api';
  }
};
