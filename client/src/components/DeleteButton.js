import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { DELETE_POST_MUTATION } from '../utils/graphql/queries';
import { FETCH_POSTS_QUERY } from '../utils/graphql/queries'

const DeleteButton = ({ postId, callback }) => {
      const [confirmOpen, setConfirmOpen] = useState(false);
      const [deletePost] = useMutation(DELETE_POST_MUTATION,{
            update(proxy){
                  setConfirmOpen(false)
                 const data  = proxy.readQuery({
                       query: FETCH_POSTS_QUERY
                  })
                  data.getPosts = data.getPosts.filter(post => post.id !== postId)
                  proxy.writeQuery({ query: FETCH_POSTS_QUERY, data})
                  if(callback) callback()
            },
            variables: {
                  postId
            }
      })

      return (
      <div>
      <Button 
        floated='right'
        as='div' 
        color='red' 
        onClick={() => setConfirmOpen(true)}>
              <Icon name='trash' style={{ margin: '0'}}/>
              </Button>
              <Confirm
              open={confirmOpen}
              onCancel={()=> setConfirmOpen(false)}
              onConfirm={deletePost}/>
      </div>
      )
}

export default DeleteButton
