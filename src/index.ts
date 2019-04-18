import { ApolloServer, gql } from "apollo-server";
import { createResolvers } from "./resolvers";
import { createMovieService } from "./movieService";
import { createDbClient } from "./dbClient";
import { dbConfig } from "./dbConfig";

const baseTypes = gql`
  type Query
`

const movieTypes = gql`
  type Movie {
    id: ID!
    title: String!
  }

  extend type Query {
    movie(id: ID!): Movie
  }
`

const typeDefs = [
  baseTypes,
  movieTypes
]

const server = new ApolloServer({ 
  typeDefs, 
  resolvers: createResolvers(
                createMovieService(
                  createDbClient(dbConfig))) 
});

server.listen().then(({ url }) => {
  console.log(`Ready as ${url}`);
})