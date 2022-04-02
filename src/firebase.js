// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';  
// import 'firebase/auth' 
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD0ke7m2nHQguEehkMQARY6VMxinpkuM4",
  authDomain: "tasques-2df49.firebaseapp.com",
  projectId: "tasques-2df49",
  storageBucket: "tasques-2df49.appspot.com",
  messagingSenderId: "786850638978",
  appId: "1:786850638978:web:3bb21c5ee6e4a20fde189b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()   
export { db }