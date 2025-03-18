// Import Firebase Auth and Realtime Database SDKs
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getDatabase, ref, remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

// Initialize Firebase Auth and Database
const auth = getAuth();
const db = getDatabase();

// Check if a user is authenticated
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // If no user is authenticated, redirect to login
    console.log('No user authenticated, redirecting to login');
    window.location.href = 'fbase.html';
  } else {
    console.log("User is signed in:", user.email);
    // Store the user UID in a global variable for use during logout
    window.currentUserUid = user.uid;
  }
});

// Logout button functionality
document.getElementById('logoutButton').addEventListener('click', async () => {
  try {
    // Remove the session from Realtime Database if a user is logged in
    if (window.currentUserUid) {
      const sessionRef = ref(db, 'activeSessions/' + window.currentUserUid);
      console.log('Removing session for uid:', window.currentUserUid);
      await remove(sessionRef);
      console.log('Session removed successfully');
    }

    // Sign out from Firebase Authentication
    await signOut(auth);
    console.log('User signed out from Firebase Auth');
    window.location.href = 'fbase.html'; // Redirect after logout
  } catch (error) {
    console.error('Error during logout:', error.message);
  }
});