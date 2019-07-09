import React, {useContext} from 'react'
import { useQuery } from '@apollo/react-hooks';
import { FETCH_POST_QUERY } from '../../utils/graphql/queries';
import { Grid, Image, Card, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import {DeleteButton, LikeButton} from '../Buttons/';
import { authContext } from '../../context/authContext';

function SinglePost(props){

      const { user } = useContext(authContext)
      const postId = props.match.params.postId;
      let postMarkUp;
      const { data: { getPost } } = useQuery(FETCH_POST_QUERY, {
            variables: {
                  postId
            }
      });

      function deletePostCallBack(){
            props.history.push('/')
      }

      if (!getPost) {
            postMarkUp = <p> Loading Post...</p>
      } else {
            const {id, body, createdAt, username, comments, likes, likeCount, commentCount} = getPost;
            postMarkUp = (

                  <Grid>
                        <Grid.Row>
                             <Grid.Column width={2}>
                              <Image
                              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                              size="small"
                              float="right"/>
                             </Grid.Column>
                             <Grid.Column width={10}>
                              <Card fluid>
                                    <Card.Content>
                                          <Card.Header>{username}</Card.Header>
                                          <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                          <Card.Description>{body}</Card.Description>
                                          <hr/>
                                          <Card.Content extra>
                                                <LikeButton user={user} post={{id, likeCount, likes }}/>
                                                <Button as="div"
                                                labelPosition="right"
                                                onClick={() => console.log('comment on post')}>

                                                      <Button basic color="blue">
                                                            <Icon name="comments"/>
                                                      </Button>
                                                      <Label basic color="blue" pointing="left">
                                                            {commentCount}
                                                      </Label>
                                                </Button>
                                                
                                                {
                                                user && user.username === username && (
                                                      <DeleteButton postId={id} callback={deletePostCallBack}/>
                                                )
                                                }
                                                
                                          </Card.Content>
                                    </Card.Content>
                              </Card>
                             </Grid.Column>

                        </Grid.Row>
                  </Grid>
      );
      }
   return postMarkUp
}


export default SinglePost
