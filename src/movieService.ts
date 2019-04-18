export function createMovieService (dbClient) {
  const moviesRef = dbClient.collection("movies");
  const keywordsRef = dbClient.collection("keywords");
  const ratingsRef = dbClient.collection("ratings");

  return {
    // get all movies
    async getAllMovies() {
      const movieCollection = await moviesRef.get();
      return movieCollection.docs.map(x => x.data());
    },

    // get movie by id 
    // TODO: return
    async getMovieById(id) {
      const doc = await moviesRef.doc(id).get();
      return doc.exists ? doc.data() : null;
    },

    // get keywords by id
    // TODO: return
    async getKeywordsByMovieId(id) {
      const doc = await keywordsRef.doc(id).get();
      return doc.exists ? doc.data() : null;
    },

    // add rating
    async addRating({ movieId, userId, score }) {
      const ratingId = `${userId}:${movieId}`;
      await ratingsRef.doc(ratingId).set({ score });
    }
  }

}