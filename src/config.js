import firebase from 'firebase';

var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "3",
    appId: "",
    measurementId: ""

  };

firebase.initializeApp(config);
const db = firebase.firestore()
// db.enablePersistence()

const auth = firebase.auth()
const file = firebase.storage()

export { db, auth, file }