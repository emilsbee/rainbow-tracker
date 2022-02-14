import { history } from '../../routers/AppRouter';

export const checkIfLoggedIn = async (userid: string):Promise<boolean> => {
  let res;
  try {
    res = await fetch(`api/user/${userid}/auth/is-logged-in`,
      {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      },
    );

    if (res.ok) {
      return res.ok;
    } else {
      if (res.status !== 401) {
        history.push('/internal-error');
      }

      return false;
    }

  } catch (e) {
    history.push('/internal-error');
    return false;
  }
};

