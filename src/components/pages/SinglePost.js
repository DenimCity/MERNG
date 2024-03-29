import React, { useContext, useState, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Grid, Image, Card, Button, Icon, Label, Form } from 'semantic-ui-react';
import moment from 'moment';
import { FETCH_POST_QUERY, SUBMIT_COMMENT_MUTATION } from '../../utils/graphql/queries';
import { DeleteButton, LikeButton } from '../Buttons';
import { authContext } from '../../context/authContext';

function SinglePost(props) {
  const { user } = useContext(authContext);
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');
  const { postId } = props.match.params;
  let postMarkUp;
  const { data: { getPost } } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });

  function deletePostCallBack() {
    props.history.push('/');
  }

  if (!getPost) {
    postMarkUp = <p> Loading Post...</p>;
  } else {
    const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost;
    postMarkUp = (

              <Grid>
                    <Grid.Row>
                          <Grid.Column width={2}>
                               <Image
                                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                                size="small"
                                float="right" 
                              />
                             </Grid.Column>
                          <Grid.Column width={10}>
                               <Card fluid>
                                <Card.Content>
                                      <Card.Header>{username}</Card.Header>
                                      <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                      <Card.Description>{body}</Card.Description>
                                      <hr />
                                      <Card.Content extra>
                                            <LikeButton user={user} post={{ id, likeCount, likes }} />
                                            <Button
as="div"
                                                  labelPosition="right"
                                                  onClick={() => console.log('comment on post')}
                                                >

                                                  <Button basic color="blue">
                                                        <Icon name="comments" />
                                                      </Button>
                                                  <Label basic color="blue" pointing="left">
                                                        {commentCount}
                                                      </Label>
                                                </Button>
                                            {
                                                      user && user.username === username && (
                                                      <DeleteButton postId={id} callback={deletePostCallBack} />
                                                      )
                                                }

                                          </Card.Content>
                                    </Card.Content>
                              </Card>
                               {
                                    user && (
                                    <Card fluid>
                                            <Card.Content>
                                               <p>Post A Comment</p>
                                               <Form>
                                                  <div className="ui action input fluid">
                                                        <input
                                                              type="text"
                                                              placeholder="Comment"
                                                              value={comment}
                                                              onChange={event => setComment(event.target.value)}
                                                              ref={commentInputRef}
                                                            />
                                                        <button
type="submit"
                                                              className="ui button teal"
                                                              disabled={comment.trim() === ''}
                                                              onClick={submitComment}
                                                            >
Submit

                                                            </button>
                                                      </div>
                                                </Form>
                                             </Card.Content>
                                          </Card>

                                    )
                              }
                               <hr />
                               {

                                    comments && comments.map((comment) => (

                                                <Card fluid key={comment.id}>
                                                      <Card.Content>
                                                            {user && user.username === comment.username  && (
                                                                  <DeleteButton postId={id} commentId={comment.id}></DeleteButton>
                                                            )}
                                                            <Card.Header>{comment.username}</Card.Header>
                                                            <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                                            <Card.Description>{comment.body}</Card.Description>
                                                      </Card.Content>
                                                </Card>
                                          ))
                              }
                             </Grid.Column>

                        </Grid.Row>
                  </Grid>
    );
  }
  return postMarkUp;
}


export default SinglePost;
