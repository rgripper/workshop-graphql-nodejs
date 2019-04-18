import * as firebase from "firebase";

export function createDbClient (config) {
  const app = firebase.initializeApp(config);
  return firebase.firestore(app);
}