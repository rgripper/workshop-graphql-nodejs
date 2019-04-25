"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = require("./resolvers");
const movieService_1 = require("./movieService");
const dbClient_1 = require("./dbClient");
const dbConfig_1 = require("./dbConfig");
const baseTypes = apollo_server_1.gql `
  type Query
`;
const movieTypes = apollo_server_1.gql `
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
const ratingTypes = apollo_server_1.gql `
  type Mutation {
    setRating(setRatingInput: SetRatingInput!): SetInputPayload
  }

  input SetRatingInput {
    movieId: ID!
    userId: ID!
    score: Int!
  }

  type SetInputPayload {
    message: String
  }

  extend type Query {
    movieUserRating(getRatingInput: GetRatingInput!): Rating
  }
  
  input GetRatingInput {
    movieId: ID!
    userId: ID!
  }
  
  type Rating {
    score: Int
  }
`;
const dbClient = dbClient_1.createDbClient(dbConfig_1.dbConfig);
// upload(dbConfig);
// // or
// useMockDB().then(dbClient => {
const typeDefs = [baseTypes, movieTypes, ratingTypes];
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.resolvers,
    playground: true,
    context: {
        movieService: movieService_1.createMovieService(dbClient)
    },
    introspection: true,
    formatError: error => {
        console.error(error);
        return new Error('Internal server error');
        // Or, you can delete the exception information
        // delete error.extensions.exception;
        // return error;
    },
});
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Ready as ${url}`);
});
//});
