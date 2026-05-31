// Signup function
async function signup() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  const message = document.getElementById('message');

  try {
    const response = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, role })
    });

    const data = await response.json();

    if (response.ok) {
      message.style.color = 'green';
      message.textContent = 'Account created! Redirecting to login...';
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    } else {
      message.textContent = data.message;
    }

  } catch (error) {
    message.textContent = 'Something went wrong!';
  }
}

// Login function
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('message');

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      message.style.color = 'green';
      message.textContent = 'Login successful! Redirecting...';
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    } else {
      message.textContent = data.message;
    }

  } catch (error) {
    message.textContent = 'Something went wrong!';
  }
}