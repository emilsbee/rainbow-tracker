import * as React from 'react';
import qs from 'qs';

import { Auth } from './services';
import { AuthenticationContext, initialState } from './context';
import { setAuthenticationTokens, removeAuthenticationTokens } from './token';
import { AuthenticationState } from './types';

const useAuthenticationContext = () => {
  const context = React.useContext(AuthenticationContext);
  if (!context) {
    throw new Error('Components should be rendered inside the AuthenticationProvider component');
  }

  return context;
};

export const useAuthenticationActions = () => {
  const { dispatch } = useAuthenticationContext();

  const login = async (email: string, password: string) => (
    new Promise<AuthenticationState>((resolve, reject) => {
      dispatch({ loading: true });

      Auth.post({
        path: '/jwt/create',
        body: {
          email: email.toLowerCase(),
          password,
        },
      })
        .then((tokens) => {
          setAuthenticationTokens(tokens);
          const response = dispatch({
            authenticated: true,
            loading: false,
            error: false,
          });

          resolve(response);
        })
        .catch((error) => {
          dispatch({
            loading: false,
            error: true,
          });

          reject(error);
        });
    })
  );

  const logout = () => (
    new Promise<AuthenticationState>((resolve, reject) => {
      dispatch({ loading: true });

      removeAuthenticationTokens();
      const response = dispatch({
        ...initialState,
        loading: false,
        authenticated: false,
      });

      resolve(response);
    })
  );

  const activateAccount = () => (
    new Promise<AuthenticationState>((resolve, reject) => {
      const { uid, token } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
      if (!uid || !token) {
        dispatch({ error: true });
        return reject('uid and/or token are not present in the url.');
      }

      dispatch({ loading: true });

      Auth.post({
        path: '/users/activation/',
        body: {
          uid,
          token,
        },
      })
        .then(() => {
          const response = dispatch({
            authenticated: false,
            loading: false,
            error: false,
          });

          resolve(response);
        })
        .catch((error) => {
          dispatch({
            loading: false,
            error: true,
          });

          reject(error);
        });
    })
  );

  const requestResetPassword = (email: string) => (
    new Promise<AuthenticationState>((resolve, reject) => {
      dispatch({ loading: true });

      Auth.post({
        path: '/users/reset_password/',
        body: {
          email,
        },
      })
        .then(() => {
          const response = dispatch({
            authenticated: false,
            loading: false,
            error: false,
          });

          resolve(response);
        })
        .catch((error) => {
          dispatch({
            loading: false,
            error: true,
          });

          reject(error);
        });
    })
  );

  const confirmResetPassword = (newPassword: string) => (
    new Promise<AuthenticationState>((resolve, reject) => {
      const { uid, token } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
      if (!uid || !token) {
        dispatch({ error: true });
        return reject('uid and/or token are not present in the url.');
      }

      dispatch({ loading: true });

      Auth.post({
        path: '/users/reset_password_confirm/',
        body: {
          uid,
          token,
          new_password: newPassword.trim(),
        },
      })
        .then(() => {
          const response = dispatch({
            authenticated: false,
            loading: false,
            error: false,
          });

          resolve(response);
        })
        .catch((error) => {
          dispatch({
            loading: false,
            error: true,
          });

          reject(error);
        });
    })
  );

  return {
    login,
    logout,
    activateAccount,
    requestResetPassword,
    confirmResetPassword,
  };
};

export const useAuthenticationUser = () => {
  const { state } = useAuthenticationContext();
  const { authenticated, loading, error } = state;
  const determined = typeof authenticated !== 'undefined';

  return {
    determined,
    authenticated: determined
      ? authenticated
      : false,
    loading,
    error,
  };
};
