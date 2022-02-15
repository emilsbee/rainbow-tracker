import { routeConfig } from 'services';

const redirect = (): void => {
  window.location.href = routeConfig.loginPage();
};

export const redirectToLogin = () => {
  // TODO: removeAuthenticationTokens();
  redirect();
};
