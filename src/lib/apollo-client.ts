import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  cache: new InMemoryCache(),
});

export const getStrapiMedia = (url: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
};
