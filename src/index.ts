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

  type MovieFeedback {
    movieId: ID!
    reviews: [Review!]
    averageScore: Float!
  }

  type Review {
    movieId: ID!
    userId: ID!
    text: String!
  }

  extend type Query {
    movie(id: ID!): Movie
    movies: [Movie!]
    movieFeedback(id: ID!): MovieFeedback
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