import { ApolloServer } from 'apollo-server';

import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';

const { log: print } = console;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen()
  .then(({ url }) => {
    print(`GraphQL service running on ${url}`);
  });
