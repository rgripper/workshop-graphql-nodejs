export function createResolvers (movieService) {
  return {
    Query: {
      movie: movieService.getMovieById
    }
  }
}