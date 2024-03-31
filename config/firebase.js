// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYm0KGp46nvB9oAQXqt2DEXw__N0vD7Cs",
  authDomain: "test-yss.firebaseapp.com",
  projectId: "test-yss",
  storageBucket: "test-yss.appspot.com",
  messagingSenderId: "687392638647",
  appId: "1:687392638647:web:009c6b8801cc54ff792f32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
firebase.firestore();
export { app, auth, getApp, getAuth };