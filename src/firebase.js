// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCNNBcX_XJ8eDmUKEvHiG3cQSsfRaeqaBQ",
    authDomain: "slack-clone-a0cc6.firebaseapp.com",
    databaseURL: "https://slack-clone-a0cc6.firebaseio.com",
    projectId: "slack-clone-a0cc6",
    storageBucket: "slack-clone-a0cc6.appspot.com",
    messagingSenderId: "277070418766",
    appId: "1:277070418766:web:095c63422f5668e03a441f",
    measurementId: "G-9G6L0LXK4F"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db; 