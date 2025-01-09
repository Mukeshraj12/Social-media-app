// Import the necessary Firebase functions
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';  // Import Firestore
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUGg6BCEkxNDm0QbKv4szLnSJvsGV1QSE",
  authDomain: "social-media-app-25c15.firebaseapp.com",
  projectId: "social-media-app-25c15",
  storageBucket: "social-media-app-25c15.firebasestorage.app",
  messagingSenderId: "934595679113",
  appId: "1:934595679113:web:05b3b14166005a78f08758",
  measurementId: "G-0QS92744L1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
export const db = getFirestore(app);
export const storage = getStorage(app);