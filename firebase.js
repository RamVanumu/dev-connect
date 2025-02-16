// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0Ys-oZb2rw20MJIgaDhkTzoVbEcDutJw",
    authDomain: "dev-connect-ad1dd.firebaseapp.com",
    projectId: "dev-connect-ad1dd",
    storageBucket: "dev-connect-ad1dd.appspot.com",
    messagingSenderId: "313984880129",
    appId: "1:313984880129:web:9ee15c9cafd027ae7a7a00",
    measurementId: "G-W5GD2HJR5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
