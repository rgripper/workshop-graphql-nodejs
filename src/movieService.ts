import { firestore } from "firebase";

// const average = list => list.reduce((prev, curr) => prev + curr) / list.length;

export function createMovieService(dbClient: firestore.Firestore) {
  const moviesRef = dbClient.collection("movies");
  const keywordsRef = dbClient.collection("keywords");
  const ratingsRef = dbClient.collection("ratings");
  // const reviewsRef = dbClient.collection("reviews");

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

    // async setReviewByMovieId({ movieId, userId, text }) {
    //   const reviewId = `${userId}:${movieId}`;
    //   await reviewsRef.doc(reviewId).set({ movieId, userId, text });
    // },

    async getRatingByMovieId({ movieId, userId }) {
      const ratingId = `${userId}:${movieId}`;
      const doc = await ratingsRef.doc(ratingId).get();
      return doc.data();
    }

    // async getMovieFeedbackMovieId({ movieId }) {
    //   const result1 = await ratingsRef.where('movieId', '==', movieId).get();
    //   const result2 = await reviewsRef.where('movieId', '==', movieId).get();
    //   const scores = result1.docs.map(x => x.data().score);
    //   const reviews = result2.docs.map(x => x.data());
    //   return {
    //     movieId,
    //     averageScore: average(scores),
    //     reviews
    //   }
    // }
  };
}
