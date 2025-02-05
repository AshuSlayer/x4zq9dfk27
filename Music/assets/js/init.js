// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu8wK1d72_FLa6kwvFaAp7gSKRcY2JENE",
  authDomain: "rock-politics-a5d5e.firebaseapp.com",
  projectId: "rock-politics-a5d5e",
  storageBucket: "rock-politics-a5d5e.appspot.com",
  messagingSenderId: "325558841756",
  appId: "1:325558841756:web:f97c3b608e8ee40b2dd859",
  measurementId: "G-50W5XEP4L1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth so other files can use it
export { auth };
