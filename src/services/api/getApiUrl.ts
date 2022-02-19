export const getApiUrl = () => {
  switch (import.meta.env.VITE_APP_ENV) {
    case 'develop':
      return 'https://rainbow-tracker-backend-dev-rhcas.ondigitalocean.app/api';
    case 'production':
      return 'https://rainbow.emils.xyz/api';
  }
};
