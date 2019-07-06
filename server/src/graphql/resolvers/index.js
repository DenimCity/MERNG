import postsResolvers from './posts';
import userResolvers from './users';


export default {
      Query: {
            ...postsResolvers.Query
      },
      Mutation : {
            ...userResolvers.Mutation
      }
}