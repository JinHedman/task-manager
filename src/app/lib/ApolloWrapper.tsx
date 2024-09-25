"use client";

// because layout is a server-side component we cant wrap it with apollo provider
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient"; // Apollo client setup

export default function ApolloWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}