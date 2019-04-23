import { firestore } from "firebase";

export function createMovieService(dbClient: firestore.Firestore) {
  const moviesRef = dbClient.collection("movies");
  const keywordsRef = dbClient.collection("keywords");
  const ratingsRef = dbClient.collection("ratings");

  return {
    async getAllMovies() {
      const movieCollection = await moviesRef.get();
      return movieCollection.docs.map(x => x.data());
    },

    async getMovieById(id) {
      const doc = await moviesRef.doc(id).get();
      return doc.data();
    },

    async getKeywordsByMovieId(movieId) {
      const doc = await keywordsRef.doc(movieId).get();
      return doc.data();
    },

    // add rating
    async setRatingByMovieId({ movieId, userId, score }) {
      const ratingId = `${userId}:${movieId}`;
      await ratingsRef.doc(ratingId).set({ movieId, score });
    },

    async getRatingByMovieId({ movieId, userId }) {
      const ratingId = `${userId}:${movieId}`;
      const doc = await ratingsRef.doc(ratingId).get();
      return doc.data();
    }
  };
}
