import firebase from "firebase";

const config = {
  apiKey: "API_KEY", // DO NOT COMMIT!!!
  authDomain: "movies-40b57.firebaseapp.com",
  databaseURL: "https://movies-40b57.firebaseio.com",
  projectId: "movies-40b57",
  storageBucket: "movies-40b57.appspot.com",
  messagingSenderId: "719611461160"
};

firebase.initializeApp(config);

const db = firebase.firestore();
const moviesRef = db.collection("movies");
const keywordsRef = db.collection("keywords");
const ratingsRef = db.collection("ratings");

// get all movies
export const getAllMovies = () => {
  return moviesRef.get().then(movieCollection => {
    movieCollection.forEach(doc => {
      console.log(doc.id, " => ", doc.data());
    });
    return movieCollection;
  });
};

// get movie by id 
// TODO: return
export const getlMovieById = id => {
  return moviesRef
    .doc(id)
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No such movie!");
      } else {
        console.log("Movie data:", doc.data());
      }
    })
    .catch(err => {
      console.log("Error getting movie", err);
    });
};

// get keywords by id
// TODO: return
export const getlKeywordsById = id => {
  return keywordsRef
    .doc(id)
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No keywords doc for this movie id!");
      } else {
        console.log("Keywords data:", doc.data());
      }
    })
    .catch(err => {
      console.log("Error getting keywords", err);
    });
};

// add rating
export const addRating = ({ id, rating }) => {
  ratingsRef.doc(id).set({
    id,
    rating
  });
};
