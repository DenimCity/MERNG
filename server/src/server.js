/* eslint-disable camelcase */

import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';

import { logger } from './utils';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDef';

const options = {
  host: '127.0.0.1',
  port: 6379,
  retry_strategy: options => Math.max(options.attempt * 100, 3000)

};

const pubsub = new RedisPubSub({

  publisher: new Redis(options),
  subscriber: new Redis(options)
});


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
