import { getApiUrl } from 'services';

const authCredentials = () => {
  const apiUrl = getApiUrl();

  return {
    TOKEN_STORAGE_KEY: 'auth_refresh_token',
    REFRESH_TOKEN_INTERVAL: 300, /* 5 minutes = 300 seconds */
    AUTH_URLS: {
      production: `${apiUrl}/auth`,
      development: `${apiUrl}/auth`,
    },
  };
};

export default authCredentials;
