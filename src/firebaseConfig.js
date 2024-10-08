// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAStxrRebL3WmOxdMF712E9wEdQaH9Mh8Y",
  authDomain: "moto-eventos-236cd.firebaseapp.com",
  projectId: "moto-eventos-236cd",
  storageBucket: "moto-eventos-236cd.appspot.com",
  messagingSenderId: "1053308777929",
  appId: "1:1053308777929:web:0fe0c4c3d08ca56e49e418",
  measurementId: "G-FFHLZ51VD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);