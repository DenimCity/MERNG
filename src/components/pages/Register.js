import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import FormErrors from '../FormErrors';

import { useForm } from '../../utils/hooks';
import { authContext } from '../../context/authContext';
import { REGISTER_USER } from '../../utils/graphql/queries';

const Register = ({ history }) => {
  const context = useContext(authContext);
  const [errors, setErrors] = useState({});


  // eslint-disable-next-line no-use-before-define
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser () {
    addUser();
  }


  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={values.email}
          error={!!errors.email}
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

        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={!!errors.confirmPassword}
          onChange={onChange}
        />

        <Button type="submit" primary>Register</Button>
      </Form>
      {
                  Object.keys(errors).length > 0 && <FormErrors errors={errors} />
            }
    </div>
  );
};


export default Register;
