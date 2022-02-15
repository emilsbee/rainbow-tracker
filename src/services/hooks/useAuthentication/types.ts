import * as i from 'types';
import { RouteProps } from 'react-router-dom';

export type AuthRequestOptions = Pick<i.RequestOptions, 'path'> & {
  options: Pick<i.RequestOptions['options'], 'method' | 'body' | 'headers'>
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type AuthRequest = <T = any>(options: AuthRequestOptions) => Promise<T>;

export type EnvironmentTypes = 'production' | 'development';

export type AuthOptions = Omit<i.Options, 'method'>;

export type AuthenticationRouteProps = RouteProps & {
  component: React.ElementType;
};

export type AuthenticationState = {
  authenticated?: boolean;
  loading: boolean;
  error: boolean;
};

export type AuthenticationContextType = {
  state: AuthenticationState;
  dispatch: (userData: Partial<AuthenticationState>) => AuthenticationState;
};

export type AuthenticationTokenType = {
  token: string;
  expires_at: number;
} | undefined;

export type AuthenticationTokensPayload = {
  refreshToken: string;
  accessToken?: string;
};
