
import { ApolloServer, PubSub } from 'apollo-server';
import mongoose from 'mongoose';
import { logger } from './utils';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDef';

require('dotenv').config();

const pubsub = new PubSub();


const server = new ApolloServer({
  // schema,
  typeDefs,
  resolvers,
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
  .catch((err => logger.error(`Error Connecting to MongoDb and Starting Server........${err.message}`)));
