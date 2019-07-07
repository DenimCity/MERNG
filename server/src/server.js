
import { ApolloServer, PubSub } from 'apollo-server';
import { logger } from './utils';
import mongoose from 'mongoose';
// import resolvers from './graphql/resolvers';
// import typeDefs from './graphql/typeDef'
import schema from './graphql'
require('dotenv').config();

const pubsub = new PubSub()


const server = new ApolloServer({
      // schema,
      schema,
  // typeDefs,
  // resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(process.env.MONGO_DB_URL, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => {
    logger.info('MongoDB Connected');
    return server.listen({ port: 4000 });
  })
  .then((res) => {
    logger.info(`Server running at ${res.url}`);
  })
  .catch((err => logger.error('Error Connecting to MongoDb and Starting Server........'+ err.message)))
