import { ApolloServer } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import fileService from '@services/file';
import resolvers from './resolver';

const graphqlSchema: string = fileService.getGraphQLSchemaFromPath(`${__dirname}/schema`);
const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [graphqlSchema, ...scalarTypeDefs],
    resolvers,
});

const apolloServer: ApolloServer = new ApolloServer({
    schema,
});

export default apolloServer;
