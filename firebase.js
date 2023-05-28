import firebase from "firebase";

const firebaseConfig ={
    apiKey: "AIzaSyBb7NKchou1IH_bHupdc0ZYZ2i6xK1sST8",
    authDomain: "chat-app-cadbb.firebaseapp.com",
    projectId: "chat-app-cadbb",
    storageBucket: "chat-app-cadbb.appspot.com",
    messagingSenderId: "303560931341",
    appId: "1:303560931341:web:e025c0a35cafc3bab1bd44",
    measurementId: "G-4FZ5EJSSR8"
  };
  const firebaseApp = firebase.initializedApp(firebaseConfig)
  const db = firebase.firestore();
  export default db;
