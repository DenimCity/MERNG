import postsResolvers from './posts';
import userResolvers from './users';
import commentsResolvers from './comments';


export default {
      // Modifiers
      // referring to Post Schema
      // Will go through these modifiers first any time Post Field is queried
      // This data comes from example 'getPosts'
      // console.log Parent so see the the data
      Post: {
            likeCount: async (parent) => parent.likes.length,
            commentCount: async (parent) => parent.comments.length
            
      },
      Query: {
            ...postsResolvers.Query
      },
      Mutation : {
            ...userResolvers.Mutation,
            ...postsResolvers.Mutation,
            ...commentsResolvers.Mutation
      },
      Subscription: {
            ...postsResolvers.Subscription
      }
}