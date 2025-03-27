// Import Firebase Auth and Realtime Database SDKs
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getDatabase, ref, get, remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

// Initialize Firebase Auth and Database
const auth = getAuth();
const db = getDatabase();

// Check authentication and session validity
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    console.log('No user authenticated, redirecting to login');
    localStorage.removeItem('sessionToken');
    window.location.href = 'fbase.html';
  } else {
    console.log("User is signed in:", user.email);
    window.currentUserUid = user.uid;

    const sessionRef = ref(db, 'activeSessions/' + user.uid);
    const localSessionToken = localStorage.getItem('sessionToken');

    try {
      const sessionSnapshot = await get(sessionRef);
      if (!sessionSnapshot.exists()) {
        console.log('No active session in database, redirecting to login');
        window.location.href = 'fbase.html';
      } else {
        const sessionData = sessionSnapshot.val();
        if (localSessionToken && sessionData.token === localSessionToken) {
          console.log('Session token matches, access granted');
        } else if (!localSessionToken) {
          console.log('No local session token, redirecting to login');
          window.location.href = 'fbase.html';
        } else {
          console.log('Session token mismatch, redirecting to login');
          window.location.href = 'fbase.html';
        }
      }
    } catch (error) {
      console.error('Error checking session:', error.message);
      window.location.href = 'fbase.html';
    }
  }
});

// Wait for DOM to load, then attach logout listener
document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    console.log('Logout button found, attaching listener');
    logoutButton.addEventListener('click', async () => {
      console.log('Logout button clicked');
      try {
        if (window.currentUserUid) {
          const sessionRef = ref(db, 'activeSessions/' + window.currentUserUid);
          console.log('Removing session for uid:', window.currentUserUid);
          await remove(sessionRef);
          console.log('Session removed successfully');
          localStorage.removeItem('sessionToken');
        } else {
          console.log('No currentUserUid found');
        }
        console.log('Attempting to sign out from Firebase Auth');
        await signOut(auth);
        console.log('User signed out from Firebase Auth');
        window.location.href = 'fbase.html';
      } catch (error) {
        console.error('Error during logout:', error.message);
      }
    });
  } else {
    console.error('Logout button not found—check your HTML!');
  }
});