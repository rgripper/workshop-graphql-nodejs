export const resolvers = {
  Query: {
    // TODO: inject through data source
    movies: (_, _PARAMS, context) => context.movieService.getAllMovies(),
    movie: (_, { id }, context) => context.movieService.getMovieById(id), // eg: 101299
    movieFeedback: (_, { id }, context) =>
      context.movieService.getKeywordsByMovieId(id)
  },

  Mutation: {
    setRating: async (_, { input }, context) => {
      try {
        await context.movieService.setRatingByMovieId(input);
      } catch (error) {
        return {
          message: error.message
        };
      }

      return {
        message: "success"
      };
    }
  }
};
