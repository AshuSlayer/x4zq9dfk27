// Function to handle sign in form submission
document.getElementById('signInForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('signInEmail').value;
  const password = document.getElementById('signInPassword').value;
  signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed in:', user);
      window.location.href = 'index.html'; // Adjust as needed
    })
    .catch((error) => {
      console.error('Sign in error:', error.message);
      alert('The email or password is Invalid ❌'); // Display error to user
    });
});

// Function to handle sign up form submission
document.getElementById('signUpForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;
  signUpWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed up:', user);
      alert('✔️ Successfully Registered. You can now Sign-In');
      document.getElementById('signUpForm').reset(); // Clear sign-up form fields
    })
    .catch((error) => {
      console.error('Sign up error:', error.message);
      alert(error.message); // Display error to user
    });
});
