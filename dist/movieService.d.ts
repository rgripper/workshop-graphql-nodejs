import { firestore } from "firebase";
export declare function createMovieService(dbClient: firestore.Firestore): {
    getAllMovies(): Promise<firestore.DocumentData[]>;
    getMovieById(id: any): Promise<firestore.DocumentData>;
    getKeywordsByMovieId(movieId: any): Promise<firestore.DocumentData>;
    setRatingByMovieId({ movieId, userId, score }: {
        movieId: any;
        userId: any;
        score: any;
    }): Promise<void>;
    getRatingByMovieId({ movieId, userId }: {
        movieId: any;
        userId: any;
    }): Promise<firestore.DocumentData>;
};
