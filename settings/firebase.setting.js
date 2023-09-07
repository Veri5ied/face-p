// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBimlR-Dwt5gbEDbj3dhH2ivaroyXRlNn4",
  authDomain: "facepal-f00db.firebaseapp.com",
  projectId: "facepal-f00db",
  storageBucket: "facepal-f00db.appspot.com",
  messagingSenderId: "913264259738",
  appId: "1:913264259738:web:6a9924e400d35b925ea523",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {authentication,db,storage}