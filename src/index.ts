import { ApolloServer, gql } from "apollo-server";

const movies = [{ id: '1', title: 'Toy Story' }, { id: '2', title: 'Saving Private Ryan' }]

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

const resolvers = {
  Query: {
    movie: (_, { id }) => {
      return movies.find(x => x.id === id)
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Ready as ${url}`);
})