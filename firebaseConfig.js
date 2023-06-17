// Import functions from SDKs and APIs needed
import { initializeApp } from "firebase/app";
import { initializeAuth, reactNativeLocalPersistence } from "firebase/auth";
import {
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from "@env";

// Firebase configuration (web)
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_PROJECT_ID + ".firebaseapp.com",
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_PROJECT_ID + ".appspot.com",
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = initializeAuth(app, {
  persistence: reactNativeLocalPersistence,
});
