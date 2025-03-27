// Function to generate a simple session token
function generateSessionToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Function to handle sign-in form submission
document.getElementById('signInForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const email = document.getElementById('signInEmail').value;
  const password = document.getElementById('signInPassword').value;

  try {
    console.log('Attempting to sign in with email:', email);

    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      console.log('User email not verified:', email);
      alert('Please verify your email before signing in. Check your inbox (and spam folder)!');
      await auth.signOut();
      return;
    }

    // Check for existing session
    const sessionRef = ref(db, 'activeSessions/' + user.uid);
    const sessionSnapshot = await get(sessionRef);
    const localSessionToken = localStorage.getItem('sessionToken');

    if (sessionSnapshot.exists()) {
      const sessionData = sessionSnapshot.val();
      if (localSessionToken && sessionData.token === localSessionToken) {
        // This tab owns the session—allow it to proceed
        console.log('Existing session matches local token, proceeding:', sessionData.token);
        window.location.href = 'index.html';
      } else {
        // Session exists but this tab doesn’t own it
        console.log('Existing session found for uid:', user.uid);
        alert('This email is already signed in on another device. Only one session is allowed at a time.');
        await auth.signOut();
        return;
      }
    } else {
      // No existing session—create a new one
      const sessionToken = generateSessionToken();
      await set(sessionRef, {
        email: email,
        token: sessionToken,
        timestamp: Date.now()
      });
      localStorage.setItem('sessionToken', sessionToken); // Store the token locally
      console.log('User signed in with new session token:', sessionToken);
      window.location.href = 'index.html';
    }

    // Clean up session on sign-out
    auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        console.log('User signed out, removing session for:', email);
        try {
          await remove(sessionRef);
          localStorage.removeItem('sessionToken');
          console.log('Session removed successfully');
        } catch (removeError) {
          console.error('Error removing session:', removeError.message);
        }
      }
    });

  } catch (error) {
    console.error('Sign-in error:', error.message, 'Error code:', error.code);
    if (
      error.code === 'auth/wrong-password' ||
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/invalid-email' ||
      error.code === 'auth/invalid-credential'
    ) {
      alert('The email or password is invalid ❌');
    } else {
      console.log('Non-authentication error during sign-in (not shown to user):', error.message);
      if (window.location.href.includes('index.html')) {
        console.log('Login succeeded despite error, suppressing alert');
      } else {
        console.log('Unexpected error during sign-in, consider notifying user:', error.message);
      }
    }
  }
});

// Function to handle sign-up form submission
document.getElementById('signUpForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;
  const username = document.getElementById('User').value;

  try {
    const userCredential = await signUpWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);
    console.log('Verification email sent to:', email);
    alert('✔️ Successfully Registered! A verification email has been sent to ' + email + ' . Please verify your account!');

    document.getElementById('signUpForm').reset();
    document.getElementById('signUpSection').style.display = 'none';
    document.querySelector('.register-link').style.display = 'block';

  } catch (error) {
    console.error('Sign-up error:', error.message, 'Error code:', error.code);
    alert('Sign-up failed: ' + error.message);
  }
});

// Function to handle forgot password
document.getElementById('forgotPasswordLink').addEventListener('click', async function(event) {
  event.preventDefault();
  let email = document.getElementById('signInEmail').value;
  if (!email) {
    email = prompt('Please enter your email to reset your password:');
    if (!email) {
      alert('No email provided. Please enter an email to reset your password.');
      return;
    }
  }
  try {
    await sendPasswordResetEmail(email);
    console.log('Password reset email sent to:', email);
    alert('✔️ A password reset email has been sent to ' + email + '. Please check your inbox or spam folder.');
  } catch (error) {
    console.error('Password reset error:', error.message);
    alert('Failed to send password reset email: ' + error.message);
  }
});