import { ApolloServer, gql } from "apollo-server";
import { resolvers } from "./resolvers";
import { createMovieService } from "./movieService";
import { createDbClient } from "./dbClient";
import { dbConfig } from "./dbConfig";

const baseTypes = gql`
  type Query
`;

const movieTypes = gql`
  type Movie {
    id: ID!
    title: String!
    keywords: [Keyword!]
    overview: String
    posterUrl: String!
    tagline: String
    voteAverage: Float
    releaseDate: String
    genres: [String!]
    runtime: Int
    revenue: Int
    language: String
    imdbId: String
    posterPath: String
  }

  type Keyword {
    id: ID!
    name: String!
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
`;

const ratingTypes = gql`
  type Mutation {
    setRating(input: SetRatingInput!): SetInputPayload
  }

  input SetRatingInput {
    movieId: ID!
    userId: ID!
    score: Int!
  }

  type SetInputPayload {
    message: String
  }
`;

const typeDefs = [baseTypes, movieTypes, ratingTypes];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    movieService: createMovieService(createDbClient(dbConfig))
  }
});

server.listen().then(({ url }) => {
  console.log(`Ready as ${url}`);
});
