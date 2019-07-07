import {createComment ,deleteComment} from './loaders'


export default {
      Mutation: {
            createComment: async (_, { postId, body}, context) => createComment(_, { postId, body}, context),
            deleteComment: async (_, { postId, commentId }, context) => deleteComment(_, { postId, commentId }, context)
      }
}