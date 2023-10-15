import { AppRegistry } from 'react-native';
import App from './App'; // Assuming your main app component is in App.js
import { name as appName } from './app.json';
import firebase from '@react-native-firebase/app';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBT1_NAZgi1SeJ0LMGIE_LsxgIrjJocyCg",
    databaseURL: "https://mobilesensor-ac748-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "mobilesensor-ac748",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

AppRegistry.registerComponent(appName, () => App);
