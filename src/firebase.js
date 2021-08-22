const firebase = require("firebase/app");

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
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true,
}

firestore.settings(settings);

export default firebase;
export { firestore };