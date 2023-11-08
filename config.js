import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

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


const db = getDatabase();

export { db };
