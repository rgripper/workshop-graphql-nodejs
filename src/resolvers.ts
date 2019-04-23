import { createMovieService } from "./movieService";

type MovieService = ReturnType<typeof createMovieService>
type MovieResolver = (obj: any, params: any, context: { movieService: MovieService }) => unknown
type MovieResolverMap = { [key: string]: { [key: string]: MovieResolver } }

export const resolvers: MovieResolverMap = {
  Query: {
    // TODO: inject through data source
    movies: (_, _PARAMS, context) => context.movieService.getAllMovies(),
    movie: (_, { id }, context) => context.movieService.getMovieById(id), // eg: 101299
    movieUserRating: (_, { getRatingInput }, context) =>
      context.movieService.getRatingByMovieId(getRatingInput)
  },
  Movie: {
    keywords: async (movie, _, context) => {
      const data = await context.movieService.getKeywordsByMovieId(
        movie.id.toString()
      );
      return data && data.keywords;
    }
  },
  Mutation: {
    setRating: async (_, { setRatingInput }, context) => {
      try {
        await context.movieService.setRatingByMovieId(setRatingInput);
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
