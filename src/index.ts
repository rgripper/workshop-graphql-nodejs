import { ApolloServer, gql } from "apollo-server";
import { resolvers } from "./resolvers";
import { createMovieService } from "./movieService";
import { createDbClient } from "./dbClient";
import { dbConfig } from "./dbConfig";
import { useMockDB, upload } from "workshop-graphql-data-uploader";

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

const dbClient = createDbClient(dbConfig)
// upload(dbConfig);
// // or
// useMockDB().then(dbClient => {
  const typeDefs = [baseTypes, movieTypes, ratingTypes];

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: {
      movieService: createMovieService(dbClient)
    }
  });

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Ready as ${url}`);
  });
//});




