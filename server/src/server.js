
import { ApolloServer } from 'apollo-server';
import { logger } from './utils';
import gql from 'graphql-tag';
import mongoose from 'mongoose';
import { CLOSING } from 'ws';
require('dotenv').config();

const typeDefs = gql`
      type Query {
            sayHi: String!
      }
`;

const resolvers = {
      Query: {
            sayHi: () => 'Hello String'
      }
}
console.log(process.env.MONGO_DB_URL)
mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true})
      .then(() => logger.info('MongoDB Connected....'))
      .catch('Error Connecting to MongoDb........')

const server = new ApolloServer({
      // schema,
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    req, res, logger
  })
});


const PORT = process.env.PORT || 4000;
server.listen({port: PORT }).then(res => logger.info(`🚀...Server running on port ${res.url}`))