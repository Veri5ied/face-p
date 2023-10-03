// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbxtfF8HZPZgmP8h2w-m21iN_ZIQ36q0M",
  authDomain: "facepalv2.firebaseapp.com",
  projectId: "facepalv2",
  storageBucket: "facepalv2.appspot.com",
  messagingSenderId: "637167849242",
  appId: "1:637167849242:web:39fa781c4594c8047e26a3",
  measurementId: "G-378R52988G",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { authentication, db, storage };
