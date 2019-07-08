import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../../utils/hooks';
import gql from 'graphql-tag';

import { useMutation} from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../../utils/graphql/queries';

const PostForm = () => {


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
      submitPost()
}
      return (
            
            <Form onSubmit={onSubmit}>
                  <Form.Field>
                        <Form.Input
                              placeholder="Hi World!"
                              name="body"
                              onChange={onChange}
                              value={values.body}
                              // error={}
                        />
                        <Button type="submit" color="teal"> Submit</Button>
                  </Form.Field>
            </Form>
            
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
