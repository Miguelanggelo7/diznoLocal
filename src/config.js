const firebase = require("firebase/app");
const Firestore = require("firebase/firestore");
const Auth = require("firebase/auth");
const Analytics = require("firebase/analytics");
const Storage = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyCwghxrMQ5In0XC_1yP5HsDB2dZ1IKBqzg",
  authDomain: "diznote-aee5b.firebaseapp.com",
  databaseURL: "https://diznote-aee5b-default-rtdb.firebaseio.com",
  projectId: "diznote-aee5b",
  storageBucket: "diznote-aee5b.appspot.com",
  messagingSenderId: "484595662360",
  appId: "1:484595662360:web:456eb28087a7ccb521cd6d",
  measurementId: "G-SXCF5DHYK3"
};

// Initialize Firebase
if (!firebase.apps.length) 
  firebase.initializeApp(firebaseConfig);

// Authentication
const auth = firebase.auth();
// Firestore (Database)
const db = firebase.firestore();
// Analytics
const analytics = firebase.analytics();
// Storage
const storage = firebase.storage();

db.enablePersistence().catch(function (err){
  console.log(err.message);
})

auth.onAuthStateChanged(user => {
  if(user){
    window.location = 'index.html';
  }
});

module.exports = { auth, db, analytics, storage };