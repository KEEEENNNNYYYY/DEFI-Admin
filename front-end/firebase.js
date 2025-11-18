// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC1JQYYcusMmdmBURKjCJjbzrW48b8jIz0",
    authDomain: "defi-233ea.firebaseapp.com",
    projectId: "defi-233ea",
    storageBucket: "defi-233ea.firebasestorage.app",
    messagingSenderId: "326143891516",
    appId: "1:326143891516:web:09bd9a84cb71e4d5694b39",
    measurementId: "G-KWP9RZJL27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };