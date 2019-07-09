import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql` 
{
  getPosts {
    body
    id
    createdAt
    username
    comments {
      id
      username
      createdAt
      body
    }
    likes {
      username
    }
    likeCount
    commentCount
  }
}
`

export const FETCH_POST_QUERY = gql`
query($postId: ID!){
      getPost(postId: $postId) {
            id
            body
            createdAt
            likeCount
            username 
            likes {
                  username
            }
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

export const CREATE_POST = gql`
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


export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
  }

`

export const LIKE_POST = gql`
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

