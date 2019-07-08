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