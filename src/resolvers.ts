import { createMovieService } from "./movieService";

export function createResolvers (movieService: ReturnType<typeof createMovieService>) {
  return {
    Query: {
      // TODO: inject through data source
      movies: () => movieService.getAllMovies(),
      movie: (obj, { id }) => movieService.getMovieById(id), // eg: 101299
      movieFeedback: (obj, { id }) => movieService.getKeywordsByMovieId(id)
    }
  }
}