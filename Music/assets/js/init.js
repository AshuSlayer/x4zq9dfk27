// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu8wK1d72_FLa6kwvFaAp7gSKRcY2JENE",
  authDomain: "rock-politics-a5d5e.firebaseapp.com",
  projectId: "rock-politics-a5d5e",
  storageBucket: "rock-politics-a5d5e.appspot.com",
  messagingSenderId: "325558841756",
  appId: "1:325558841756:web:f97c3b608e8ee40b2dd859",
  measurementId: "G-50W5XEP4L1",
  databaseURL: "https://rock-politics-a5d5e-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Export auth and database functions so other files can use them
export { auth, db, ref, set, get, remove };