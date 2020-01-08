import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDFhyNZnYFcPITWmCVe9ckDgf_cORdKVVU",
    authDomain: "ai-programming.firebaseapp.com",
    databaseURL: "https://ai-programming.firebaseio.com",
    projectId: "ai-programming",
    storageBucket: "ai-programming.appspot.com",
    messagingSenderId: "923521126693",
    appId: "1:923521126693:web:8fe5712ffa97992a224acc",
    measurementId: "G-YCVZ63THB6"

  };

firebase.initializeApp(config);
const db = firebase.firestore()
// db.enablePersistence()

const auth = firebase.auth()
const file = firebase.storage()

export { db, auth, file }