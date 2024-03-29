// External imports
import React from 'react';

import { useAuthenticationActions } from 'hooks';

import './login-page.scss';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuthenticationActions();
  const navigate = useNavigate();

  // Local state
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string>('');

  const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && email.length > 0 && password && password.length > 0) {
      login(email, password)
        .then((res) => {
          navigate('/dashboard');
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <section className="login-container">
      <h2 className={'login-header'}>
                Welcome, curious person!
      </h2>

      <div className={'login-error__container'}>
        <p className={'login-error_message'}>
          {error}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor={'email'}>
          <p className={'login-input-label'}>Email</p>
        </label>
        <input
          name={'email'}
          type={'text'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <label htmlFor={'password'}>
          <p className={'login-input-label'}>Password</p>
        </label>
        <input
          name={'password'}
          type={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <section className={'login-button-container'}>
          <button className="login-button" type={'submit'}>Login</button>
        </section>
      </form>
    </section>
  );
};

export default LoginPage;
