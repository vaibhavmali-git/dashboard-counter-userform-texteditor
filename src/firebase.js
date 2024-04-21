// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtA5K-JduxFYTgPA36sYufPDUG_-dIhEA",
  authDomain: "upliance.firebaseapp.com",
  projectId: "upliance",
  storageBucket: "upliance.appspot.com",
  messagingSenderId: "974460725753",
  appId: "1:974460725753:web:8494bafad513a66a68b528",
  measurementId: "G-0Q6XV73SZN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
