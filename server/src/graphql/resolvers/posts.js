import { AuthenticationError, UserInputError } from 'apollo-server'
import Post from '../../models/Posts';
import { authorization } from '../../utils/authCheck'

export default {
      Query: {
            async getPosts() {
                  try {
                        // Sort the posts in descending order via createdAt time stamp. Most recent to oldest.
                        const posts = await Post.find().sort({createdAt: -1 });
                       return posts;
                  } catch (error) {
                        throw new Error(err)
                  }
            },
            async getPost(_, { postId }) {
                  try {
                        const errors = {}

                        if (!postId) {
                              errors.getPost = 'Post ID not provided'
                              throw new Error('why: Post ID not provided', { errors })
                        }

                        const post = await Post.findById(postId)
                       
                        if(post){
                              return post
                        } else {
                              throw new Error('Post not Found')
                        }
                  } catch (error) {
                        throw new Error(error)
                  }
            },
      },
      Mutation: {
            async createPost(_, { body }, context) {
                  const user = authorization(context);

                  const newPost = new Post({
                        body,
                        user: user.indexOf,
                        username: user.username,
                        createdAt: new Date().toISOString()
                  });
                  const post = await newPost.save();
                  context.pubsub.publish('NEW_POST', {
                        newPost: post
                  })
                  return post;
            },

            async deletePost(_, { postId }, context ) {
                  // the user is only allowed to delete their own  post
                  const user = authorization(context);
                  
                  try {
                        const post = await Post.findById(postId);
                        if (user.username === post.username) {
                              await post.delete();
                              return 'Post Deleted successfully';
                        } else {
                              throw new AuthenticationError('Action not allowed');
                        }
                 } catch (error) {
                       throw new Error(error);
                 }
            },
            likePost: async (_, { postId}, context ) => {
                   const {username} = authorization(context);

                   const post = await Post.findById(postId);

                   if (post) {
                         if (post.likes.find(like => like.username === username)) {
                               // Post already liked
                               // Unlike it 
                               post.likes = post.likes.filter(like => like.username !== username)
            
                         } else {
                               // Not liked , Like it
                               post.likes.push({
                                     username,
                                     createdAt: new Date().toISOString()
                               })
                               await post.save()
                         }
                         await post.save()
                         return post
                   } else {
                         throw new UserInputError('Post Not Found')
                   }

            }
      },
      Subscription: {
            newPost: {
                  subscribe: (_,__, {pubsub }) => pubsub.asyncIterator('NEW_POST')
            }
      }
}