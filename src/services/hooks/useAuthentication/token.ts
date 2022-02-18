import { Auth, getAuthenticationConfig, getCurrentTimestamp } from './services';
import { AuthenticationTokenType, AuthenticationTokensPayload } from './types';

// Save access token in memory.
// This needs to be done outside of react, because we have to access the token in our middleware.
let token: AuthenticationTokenType = undefined;

export const getRefreshToken = (): string | null =>  {
  const { TOKEN_STORAGE_KEY } = getAuthenticationConfig();
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

const setAccessToken = (newToken: string) => {
  const { REFRESH_TOKEN_INTERVAL } = getAuthenticationConfig();

  token = {
    token: newToken,
    expires_at: getCurrentTimestamp() + REFRESH_TOKEN_INTERVAL,
  };
};

export const setAuthenticationTokens = ({
  refreshToken, accessToken,
}: AuthenticationTokensPayload) =>  {
  const { TOKEN_STORAGE_KEY } = getAuthenticationConfig();
  localStorage.setItem(TOKEN_STORAGE_KEY, refreshToken);
  if (accessToken) setAccessToken(accessToken);
};

export const removeAuthenticationTokens = () => {
  const { TOKEN_STORAGE_KEY } = getAuthenticationConfig();
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  token = undefined;
};

export const getAuthenticationToken = () => new Promise<string>(
  async (resolve, reject) => {
    const refresh = getRefreshToken();

    if (refresh) {
      const current = getCurrentTimestamp();
      // Check if refresh needs refreshing by comparing timestamps
      if (!token || current >= token.expires_at) {
        await Auth.post({
          path: '/jwt/refresh',
          body: {
            refreshToken: refresh,
          },
        })
          .then((newToken) => {
            setAccessToken(newToken.accessToken);
          })
          .catch(() => {
            removeAuthenticationTokens();
          });
      }
    }

    return token
      ? resolve(token.token)
      : reject();
  },
);
