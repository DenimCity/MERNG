import { UserInputError, AuthenticationError } from 'apollo-server';
import Post from '../../models/Posts';
import { authorization } from '../../utils/authCheck';


export default {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = authorization(context);

      if (body.trim() === '') {
        throw new UserInputError('Empty Comment', {
          errors: {
            body: 'Comment body must not be empty'
          }
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toDateString()
        });
        await post.save();
        return post;
      }
      throw new UserInputError('Post not found');
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = authorization(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex(c => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        }
        throw new AuthenticationError('Action not allowed ');
      } else {
        throw new UserInputError('Post not found');
      }
    }
  }
};
