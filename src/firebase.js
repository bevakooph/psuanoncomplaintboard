// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvGF_lr28MFijJegwlfQkjRofww1yxZdU",
  authDomain: "psu-anon-comp-board.firebaseapp.com",
  projectId: "psu-anon-comp-board",
  storageBucket: "psu-anon-comp-board.firebasestorage.app",
  messagingSenderId: "447892563066",
  appId: "1:447892563066:web:57184673a969e9e528c7c3",
  measurementId: "G-NS123JHBRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);