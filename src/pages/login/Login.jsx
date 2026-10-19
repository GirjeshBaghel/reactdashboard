
import React, { startTransition, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser } from '../../features/auth/authSlice';
import Footer from '../../components/Footer';
import s from './Login.module.scss';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const session = useAppSelector((state) => state.auth.session);
  const status = useAppSelector((state) => state.auth.status);
  const errorMessage = useAppSelector((state) => state.auth.error);

  const [credentials, setCredentials] = useState({
    login: 'user',
    password: 'password',
  });

  const from = location.state?.from?.pathname || '/app/main';

  if (session) {
    return <Navigate replace to={from} />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(loginUser(credentials));

    if (loginUser.fulfilled.match(result)) {
      startTransition(() => {
        navigate(from, { replace: true });
      });
    }
  };

  return (
    <div className={s.root}>
      <div className={s.backgroundGlow} />

      <Row className={s.layout}>
        <Col xs="12" md="10" lg="9" xl="8" className="mx-auto">
          <div className={s.loginLayout}>
            <div className={s.brandPanel}>
              <div className={s.brandIcon}>R</div>

              <p className={s.eyebrow}>YOUR WORKSPACE</p>

              <h1>
                Work smarter.
                <br />
                Stay in control.
              </h1>

              <p className={s.brandDescription}>
                Your workspace for insights, analytics, and
                everything that keeps your business moving.
              </p>

              <div className={s.featureList}>
                <div className={s.feature}>
                  <span className={s.featureIcon}>↗</span>
                  <span>Real-time analytics</span>
                </div>

                <div className={s.feature}>
                  <span className={s.featureIcon}>✓</span>
                  <span>One organized workspace</span>
                </div>
              </div>

              <div className={s.brandFooter}>
                REACT DASHBOARD · BUILT FOR PRODUCTIVITY
              </div>
            </div>

            <div className={s.formPanel}>
              <div className={s.mobileBrand}>R</div>

              <div className={s.formHeading}>
                <span className={s.welcome}>WELCOME BACK</span>
                <h2>Sign in to your account</h2>
                <p>Enter your details to access your workspace.</p>
              </div>

              {errorMessage ? (
                <Alert color="danger" className={s.errorAlert}>
                  {errorMessage}
                </Alert>
              ) : null}

              <Form onSubmit={handleSubmit}>
                <FormGroup className={s.formGroup}>
                  <label htmlFor="username" className={s.label}>
                    Username
                  </label>

                  <Input
                    id="username"
                    className={s.input}
                    name="username"
                    onChange={(event) =>
                      setCredentials((current) => ({
                        ...current,
                        login: event.target.value,
                      }))
                    }
                    placeholder="Enter your username"
                    autoComplete="username"
                    required
                    type="text"
                    value={credentials.login}
                  />
                </FormGroup>

                <FormGroup className={s.formGroup}>
                  <label htmlFor="password" className={s.label}>
                    Password
                  </label>

                  <Input
                    id="password"
                    className={s.input}
                    name="password"
                    onChange={(event) =>
                      setCredentials((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    type="password"
                    value={credentials.password}
                  />
                </FormGroup>

                <Button
                  className={s.loginButton}
                  type="submit"
                  disabled={status === 'loading'}
                  block
                >
                  {status === 'loading' ? 'Signing in...' : 'Sign in'}
                  {status !== 'loading' && (
                    <span className={s.buttonArrow}>→</span>
                  )}
                </Button>
              </Form>

              <div className={s.divider}>
                <span>NEW TO THE WORKSPACE?</span>
              </div>

              <Button
                className={s.registerButton}
                tag={Link}
                to="/register"
                block
              >
                Create an account
              </Button>

              <p className={s.demoNote}>
                Demo access: <strong>user</strong> /{' '}
                <strong>password</strong>
              </p>

              <p className={s.copyright}>
                © {new Date().getFullYear()} React Dashboard
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <Footer className={s.footer} />
    </div>
  );
};

export default Login;
