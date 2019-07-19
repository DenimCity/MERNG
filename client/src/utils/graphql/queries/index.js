import gql from 'graphql-tag';

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
`;

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
`;
// ///////////////////////////// BELOW ARE MUTATION QUERYS /////////////////////////////////////////////////
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
`;


export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!){
    deletePost(postId: $postId)
  }

`;

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

`;


export const SUBMIT_COMMENT_MUTATION = gql`
      mutation createComment($postId: String!, $body: String!){
            createComment(postId: $postId, body: $body){
                  id
                  comments {
                        id
                        body
                        createdAt
                        username
                  }
                  commentCount
            }
      }

`;

export const DELETE_COMMENT_MUTATION = gql`
      mutation deleteComment($postId: ID!, $commentId: ID!){
            deleteComment(postId: $postId, commentId: $commentId){
                  id
                  comments {
                        id 
                        username 
                        createdAt 
                        body
                  }
                  commentCount
            }
      }
`;


export const REGISTER_USER = gql`
mutation register(
  $username: String!
  $email: String!
  $password: String!
  $confirmPassword: String!
){
  register(registerInput: {
    email: $email
    password:  $password
    confirmPassword: $confirmPassword
    username: $username
  }){
    username
    id
    token
    email
    createdAt
  }
}
`;

export const LOGIN_USER = gql`
mutation login($username: String! $password: String!){
  login(password:  $password username: $username){
    username
    id
    token
    email
    createdAt
  }
}
`;
