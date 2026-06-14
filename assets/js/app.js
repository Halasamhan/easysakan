(function () {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  const logoutBtn = document.getElementById('logoutBtn');

  if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const firstName = document.getElementById('signupFirstName').value.trim();
      const lastName = document.getElementById('signupLastName').value.trim();
      const email = document.getElementById('signupEmail').value.trim().toLowerCase();
      const password = document.getElementById('signupPassword').value;
      const confirmInput = document.getElementById('signupConfirm');
      const confirmPassword = confirmInput ? confirmInput.value : password;
      const governorate = document.getElementById('governorate').value;

      if (!firstName || !lastName || !email || password.length < 6) {
        alert('Please enter a valid first name, last name, email, and a password with at least 6 characters.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      if (!governorate) {
        alert('Please select a governorate.');
        return;
      }

      localStorage.setItem('hf_user', JSON.stringify({ firstName, lastName, email, password, governorate }));
      alert('Account created successfully. Please log in.');
      window.location.href = 'login.php';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;
      const saved = JSON.parse(localStorage.getItem('hf_user') || 'null');

      if (!saved) {
        alert('No account found. Please sign up first.');
        window.location.href = 'signup.php';
        return;
      }

      if (saved.email === email && saved.password === password) {
        localStorage.setItem('hf_session', 'active');
        window.location.href = 'index.php';
        return;
      }

      alert('Invalid email or password.');
    });
  }

  if (logoutBtn) {
    const session = localStorage.getItem('hf_session');
    
    if (session === 'active') {
      logoutBtn.style.display = 'inline-block';
      const loginLinks = document.querySelectorAll('a[href="login.php"]');
      const signupLinks = document.querySelectorAll('a[href="signup.php"]');
      loginLinks.forEach(link => link.style.display = 'none');
      signupLinks.forEach(link => link.style.display = 'none');
    }

    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('hf_session');
      window.location.href = 'login.php';
    });
  }
})();
