// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT1_NAZgi1SeJ0LMGIE_LsxgIrjJocyCg",
  authDomain: "mobilesensor-ac748.firebaseapp.com",
  databaseURL:
    "https://mobilesensor-ac748-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mobilesensor-ac748",
  storageBucket: "mobilesensor-ac748.appspot.com",
  messagingSenderId: "414133417940",
  appId: "1:414133417940:web:51ccde4a1db8f9356d4841",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Initialize Firestore

const db = getDatabase();

export { db };
