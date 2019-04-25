import { createMovieService } from "./movieService";
declare type MovieService = ReturnType<typeof createMovieService>;
declare type MovieResolver = (obj: any, params: any, context: {
    movieService: MovieService;
}) => unknown;
declare type MovieResolverMap = {
    [key: string]: {
        [key: string]: MovieResolver;
    };
};
export declare const resolvers: MovieResolverMap;
export {};
