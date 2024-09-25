// /src/app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '../../lib/schema';
import { resolvers } from '../../lib/resolvers';

// init Apollo server with typeDefs and resolvers 
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// create handler with Apollo server with nextjs integration
const handler = startServerAndCreateNextHandler(apolloServer);

export { handler as GET, handler as POST };