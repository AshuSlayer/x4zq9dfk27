import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const auth = getAuth();

// Check if a user is authenticated
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // If no user is authenticated, redirect to login
    window.location.href = '../fbase.html';
  } else {
    console.log("User is signed in:", user.email);
  }
});

// Logout button functionality
document.getElementById('logoutButton').addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('User signed out');
        window.location.href = 'fbase.html';  // Redirect after logout
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
});
