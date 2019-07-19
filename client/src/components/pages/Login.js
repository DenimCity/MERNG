import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import FormErrors from '../FormErrors';
import { useForm } from '../../utils/hooks';

import { authContext } from '../../context/authContext';
import { LOGIN_USER } from '../../utils/graphql/queries';

const Login = ({ history }) => {
  const context = useContext(authContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(login, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function login() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Log In</h1>
        <Form.Input
          label="Username"
          type="text"
          placeholder="Username"
          name="username"
          value={values.username}
          error={!!errors.username}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          error={!!errors.password}
          onChange={onChange}
        />
        <Button type="submit" primary>Login</Button>
      </Form>
      {
                  Object.keys(errors).length > 0 && <FormErrors errors={errors} />
            }
    </div>
  );
};


export default Login;
