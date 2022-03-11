
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAwSDN887h87sTkvVnhxWhRVZ3qdKOPV6U",
    authDomain: "todo-a7662.firebaseapp.com",
    projectId: "todo-a7662",
    storageBucket: "todo-a7662.appspot.com",
    messagingSenderId: "165947249243",
    appId: "1:165947249243:web:b2eab254e6b4cc6f70a57e"
  };
  
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db }