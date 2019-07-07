import { mergeSchemas } from 'graphql-tools';
import comments from './comments';
import posts from './posts';
import users from './users';

const schema = mergeSchemas({
  schemas: [
    comments,
    posts,
    users
  ]

});


export default schema;