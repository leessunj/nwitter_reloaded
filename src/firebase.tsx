// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGBzlrUmmNq12Y0AugQFbDFvnd2LKKjQo",
  authDomain: "nwitter-reloaded-bb464.firebaseapp.com",
  projectId: "nwitter-reloaded-bb464",
  storageBucket: "nwitter-reloaded-bb464.appspot.com",
  messagingSenderId: "817142252785",
  appId: "1:817142252785:web:12bb9a2952d6ad8e02d550"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);

export const storage=getStorage(app);

export const db=getFirestore(app);