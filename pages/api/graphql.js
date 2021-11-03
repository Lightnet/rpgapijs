/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.smashingmagazine.com/2020/10/graphql-server-next-javascript-api-routes/
// https://hasura.io/blog/top-5-graphql-resources-for-next-js-developers-in-2021/
// https://apuyou.io/blog/serverless-graphql-apollo-server-nextjs




// https://lyonwj.com/blog/graphql-server-next-js-neo4j-aura-vercel


/*

{
  getUser {
    id
  }
}

*/



import  { gql, ApolloServer }  from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
//import  { typeDefs } from "./schemas";
//import  { resolvers } from "./resolvers";
//import  { typeDefs } from "../../graphql/schemas";
//import  { resolvers } from "../../graphql/resolvers";

export const config = {
  api:  {
    bodyParser:  false
  }
};

const typeDefs = gql`
  type User {
    id: ID
  }

  type Query {
    getUser: User
  }
`;

const resolvers = {
  Query: {
    getUser: () => {
      return {
        id: "Foo",
      };
    },
  },
};

const apolloServer = new ApolloServer({ 
  typeDefs
  , resolvers 
  , playground: true
  , plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]

});
//export default apolloServer.createHandler({ path: "/api/graphql"}); //error
const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}
