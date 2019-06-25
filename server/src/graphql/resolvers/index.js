import { fileLoader } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'apollo-server';
import path from 'path';
import resolvers from './resolvers';
const typeDefs = fileLoader(path.join(__dirname, './**types.graphql'));
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;