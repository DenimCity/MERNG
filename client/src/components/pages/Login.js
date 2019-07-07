import React, {useState} from 'react'
import {Form, Button} from 'semantic-ui-react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks'
import FormErrors from '../FormErrors';
import { useForm } from '../../utils/hooks'



const Login = ({history}) => {
      const [errors, setErrors] =useState({})

      const { onChange, onSubmit, values } = useForm(login, {
            username: '',
            password: '',
      })

      const [loginUser, {loading}] = useMutation(LOGIN_USER, {
            update(_, result){
                  console.log('object', result)
                  history.push('/');
            },
            onError(err){
                  setErrors(err.graphQLErrors[0].extensions.exception.errors);
            },
            variables: values
      })

        function login() {
            loginUser()
        }

      return (
      <div className='form-container'>
        <Form onSubmit={onSubmit} noValidate className={ loading ? "loading" :  '' }>
            <h1>Log In</h1>
            <Form.Input
            label="Username"
            type='text'
            placeholder="Username"
            name="username"
            value={values.username}
            error={errors.username ? true : false}
            onChange={onChange}/>

            <Form.Input
            label="Password"
            placeholder="Password..."
            name="password"
            type='password'
            value={values.password}
            error={errors.password ? true : false}
            onChange={onChange}/>
        <Button type="submit" primary >Login</Button>
      </Form>
            {
                  Object.keys(errors).length > 0 &&  <FormErrors errors={errors}/>
            }
      </div>
      )
}


const LOGIN_USER = gql`
mutation login($username: String! $password: String!){
  login(password:  $password username: $username){
    username
    id
    token
    email
    createdAt
  }
}
`

export default Login