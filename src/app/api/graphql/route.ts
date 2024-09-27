import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '../../lib/schema';
import { resolvers } from '../../lib/resolvers';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';

// init Apollo server with typeDefs and resolvers 
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// custom context function to get logged-in user
export interface MyContext {
  req: NextRequest;
  res: NextResponse;
  user: {id: string; name: string; email: string};
};

// function to check if user is logged-in
const getLoggedInUser = async (req: NextRequest) => {
  // retrive session
  const session = await getServerSession(authOptions);
  
  // if no user throw an error
  if (!session || !session.user) {
    throw new Error('Not authenticated');
  }

  return session.user;
};

// create handler with Apollo server with nextjs integration
// req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req,res) => ({ req, res, user: await getLoggedInUser(req) }),
});
export { handler as GET, handler as POST };