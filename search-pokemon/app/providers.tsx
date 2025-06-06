"use client"; // บังคับให้เป็น Client Component

import client from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}