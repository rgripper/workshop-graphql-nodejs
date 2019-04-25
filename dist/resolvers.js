"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = {
    Query: {
        // TODO: inject through data source
        movies: (_, _PARAMS, context) => context.movieService.getAllMovies(),
        movie: (_, { id }, context) => context.movieService.getMovieById(id),
        movieUserRating: (_, { getRatingInput }, context) => context.movieService.getRatingByMovieId(getRatingInput)
    },
    Movie: {
        keywords: async (movie, _, context) => {
            const data = await context.movieService.getKeywordsByMovieId(movie.id.toString());
            return data && data.keywords;
        }
    },
    Mutation: {
        setRating: async (_, { setRatingInput }, context) => {
            try {
                await context.movieService.setRatingByMovieId(setRatingInput);
            }
            catch (error) {
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
