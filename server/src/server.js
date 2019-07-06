
import { ApolloServer } from 'apollo-server';
import { logger } from './utils';
import mongoose from 'mongoose';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDef'
require('dotenv').config();



const server = new ApolloServer({
      // schema,
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
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
