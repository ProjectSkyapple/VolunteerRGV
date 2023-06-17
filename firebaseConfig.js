// Import functions from SDKs and APIs needed
import { initializeApp } from "firebase/app";
import { initializeAuth, reactNativeLocalPersistence } from "firebase/auth";
import { Constants } from "expo-constants";

// Firebase configuration (web)
const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseProjectId + ".firebaseapp.com",
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseProjectId + ".appspot.com",
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = initializeAuth(app, {
  persistence: reactNativeLocalPersistence,
});
