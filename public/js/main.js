// Fetch and display NGOs on home page
async function loadNGOs() {
  try {
    const response = await fetch('http://localhost:3000/api/ngo');
    const ngos = await response.json();

    const grid = document.getElementById('ngo-grid');
    
    if (ngos.length === 0) {
      grid.innerHTML = '<p>No NGOs found</p>';
      return;
    }


    ngos.forEach(ngo => {
      grid.innerHTML += `
        <div class="ngo-card">
          <h3>${ngo.name}</h3>
          <p>${ngo.description}</p>
          <p><strong>Location:</strong> ${ngo.location}</p>
          <a href="ngo-details.html?id=${ngo._id}" class="btn">View Details</a>
        </div>
      `;
    });

  } catch (error) {
    console.log('Error loading NGOs:', error);
  }
}

loadNGOs();
// Update navbar based on login status
function updateNavbar() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navLinks = document.querySelector('.nav-links');

  if (token) {
    // User is logged in
    navLinks.innerHTML = `
      <a href="index.html">Home</a>
      <a href="explore.html">Explore NGOs</a>
      ${role === 'ngo' ? '<a href="dashboard.html">Dashboard</a>' : ''}
      <a href="#" onclick="logoutUser()" class="nav-btn">Logout</a>
    `;
  } else {
    // User is not logged in
    navLinks.innerHTML = `
      <a href="index.html">Home</a>
      <a href="explore.html">Explore NGOs</a>
      <a href="login.html">Login</a>
      <a href="signup.html" class="nav-btn">Get Started</a>
    `;
  }
}

function logoutUser() {
  localStorage.clear();
  window.location.href = 'index.html';
}

updateNavbar();