import {getPosts, getPost, deletePost, likePost, createPost} from './loaders'

      

export default {
      Query: {
            getPosts: async () => getPosts(),
            getPost: async (_, { postId })  => getPost(_, {postId }),
      },
      Mutation: {
            createPost: async (_, { body }, context) => createPost(_, { body }, context),
            deletePost: async (_, { postId }, context) => deletePost(_, { postId }, context),
            likePost: async (_, { postId}, context ) => likePost(_, { postId}, context ),
      },
      Subscription: {
            newPost: {
                  subscribe: (_,__, {pubsub }) => pubsub.asyncIterator('NEW_POST')
            }
      }
}