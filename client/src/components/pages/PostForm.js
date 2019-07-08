import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../../utils/hooks';
import gql from 'graphql-tag';

import { useMutation} from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../../utils/graphql/queries';
import FormErrors from '../FormErrors';

const PostForm = () => {

      const [errors, setErrors] =useState({})

      const { onChange,onSubmit, values } = useForm(createPost, {
            body: ''
      })

      const [submitPost, { error }] = useMutation(CREATE_POST, {
            variables: values,
            update(proxy, result) {
                  const data = proxy.readQuery({ query: FETCH_POSTS_QUERY })
                  data.getPosts = [result.data.createPost, ...data.getPosts]
                  proxy.writeQuery({ query: FETCH_POSTS_QUERY, data})
                  values.body = ''
            }
      })

function createPost(){
      const errors = {}
      if(values.body.trim() === '') {
            errors.body = 'cannot be empty'
            setErrors(errors)
      } else {
            submitPost()
      }
      
}
      return (
            <div>
            <Form onSubmit={onSubmit}>
                  <Form.Field>
                        <Form.Input
                              placeholder="Hi World!"
                              name="body"
                              onChange={onChange}
                              value={values.body}
                              error={errors.body ? true : false}
                        />
                        <Button type="submit" color="teal"> Submit</Button>
                  </Form.Field>
            </Form>
               {
                  Object.keys(errors).length > 0 &&  <FormErrors errors={errors}/>
                }
            </div>
            
      )
}


const CREATE_POST = gql`
mutation createPost($body: String!) {
      createPost(body: $body)   {
            id body createdAt username 
            likes {
               id 
               username 
               createdAt
            }
            likeCount
            commentCount
            comments {
                id 
                username 
                createdAt 
                body
            }
}
}
`


export default PostForm
