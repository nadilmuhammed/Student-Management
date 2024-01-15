// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQxwocO3YRM6BN--3RRzTxqaXblXJX6X0",
  authDomain: "otp-project-9b22f.firebaseapp.com",
  projectId: "otp-project-9b22f",
  storageBucket: "otp-project-9b22f.appspot.com",
  messagingSenderId: "266247851124",
  appId: "1:266247851124:web:cc2cece4e44f0e81a19521",
  measurementId: "G-W8XR3NF173"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const google = new GoogleAuthProvider();
 
export { auth, google}