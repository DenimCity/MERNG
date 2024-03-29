import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../../utils/hooks';
import { FETCH_POSTS_QUERY, CREATE_POST } from '../../utils/graphql/queries';

const PostForm = () => {
  const { onChange, onSubmit, values } = useForm(createPost, {
    body: ''
  });

  const [submitPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = '';
    }
  });

  function createPost() {
    submitPost();
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
            error={!!error}
          />
          <Button type="submit" color="teal"> Submit</Button>
        </Form.Field>
      </Form>
      {
                     error && (
                     <div className="ui error message" style={{ marginBottom: '20' }}>
                       <ul className="list">
                         <li>{error.graphQLErrors[0].message}</li>
                       </ul>
                     </div>
                     )
               }
    </div>

  );
};


export default PostForm;
