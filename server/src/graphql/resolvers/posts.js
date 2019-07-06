import Post from '../../models/Posts';
export default {
      Query: {
            async getPosts() {
                  try {
                        const posts = await Post.find();
                       return posts;
                  } catch (error) {
                        throw new Error(err)
                  }
            }
      }
}