import * as React from 'react';

import { getAuthenticationToken } from './token';
import { AuthenticationState, AuthenticationContextType } from './types';

export const AuthenticationContext = React.createContext<AuthenticationContextType | null>(null);

export const initialState: AuthenticationState = {
  authenticated: undefined,
  loading: false,
  error: false,
};

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState(initialState);
  const dispatch = (userData: Partial<AuthenticationState>) => {
    const state = {
      ...user,
      ...userData,
    };

    setUser(state);
    return state;
  };

  React.useEffect(() => {
    const determineUser = async () => {
      dispatch({ loading: true });

      getAuthenticationToken()
        .then(() => {
          dispatch({
            authenticated: true,
            loading: false,
          });
        })
        .catch(() => {
          dispatch({
            authenticated: false,
            loading: false,
          });
        });
    };

    determineUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ state: user, dispatch }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
