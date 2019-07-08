import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import { Button, Icon, Label } from 'semantic-ui-react';


const LikeButton = ({user, post: {id, likes, likeCount}}) => {
       const [liked, setLiked] = useState(false)

       const [likePost] = useMutation(LIKE_POST, {
             variables: { postId: id}
       })

      useEffect(() => {
            if (user && likes.find(like => like.user === user.username)) {
                  setLiked(true)
            } else {
                  setLiked(false)
            }
      }, [user, likes])

      const likedButton = user ? (
            liked ? (
                  <Button color='teal' basic >
            <Icon name='heart' />
         </Button>
            ) : (
                  <Button color='teal'   >
                  <Icon name='heart' />
            </Button>
            )
      ) : (
            <Button as={Link} to="/login" color='teal'  >
            <Icon name='heart' />
         </Button>
      )
      return (
      <Button as='div' labelPosition='right' onClick={likePost}>
            {likedButton}
         <Label  basic color='teal' pointing='left'>
            {likeCount}
        </Label>
      </Button>
      )
}


const LIKE_POST = gql`
      mutation likePost($postId: ID!){
            likePost(postId: $postId) {
                  id
                  likes {
                        id
                        username
                  }
                  likeCount
            }
      }

`

export default LikeButton
