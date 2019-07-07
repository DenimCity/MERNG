import { fileLoader } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'apollo-server';
import path from 'path';
import resolvers from './resolvers';
// import shared from '../shared/'

const typeDefs = fileLoader(path.join(__dirname, '../shared/**types.graphql'));
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;