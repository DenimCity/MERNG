import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../PostCard';
import { authContext } from '../../context/authContext';
import PostForm from './PostForm';
import { FETCH_POSTS_QUERY } from '../../utils/graphql/queries';


const Home = () => {
  const { user } = useContext(authContext);
  const { loading, data: { getPosts: posts } } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {
                            user && (
                            <Grid.Column>
                              <PostForm />
                            </Grid.Column>
                            )
                      }
        {
                        loading ? (<h1>Loading Posts...</h1>)
                          : (
                            <Transition.Group>
                              {
                                    posts && posts.map(post => (
                                      <Grid.Column key={post.id} style={{ marginBottom: '20px' }}>
                                        <PostCard posts={post} />
                                      </Grid.Column>
                                    ))
                             }
                            </Transition.Group>
                          )
                  }
      </Grid.Row>

    </Grid>
  );
};

export default Home;
