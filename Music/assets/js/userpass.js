function checkPassword() {
  var password = document.getElementById('password').value;
  if (password === 'azu') {
    var passwordSection = document.getElementById('password-section');
    var contentSection = document.getElementById('content-section');

    // Add animation classes
    passwordSection.classList.add('fade-out-left');
    contentSection.classList.add('fade-in-right');

    // Delay the display logic to match the animation duration
    setTimeout(function() {
      passwordSection.style.display = 'none'; // Hide password section
      contentSection.style.display = 'block'; // Show content section
    }, 1000); // Match this duration with your CSS animation duration (1s)

    return false; // Prevent form submission
  } else {
    alert('Incorrect password. Please try again.');
    return false; // Prevent form submission
  }
}

document.getElementById('protected-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link action
    var password = prompt('Please enter the password:');
    if (password === '1234567') { // Replace 'yourpassword' with the actual password
      window.location.href = 'pro.html';
    } else {
      alert('Incorrect password.');
    }
  });

