// Check if user is logged in
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

if (!token) {
  alert('Please login first!');
  window.location.href = 'login.html';
}

// Create NGO Profile
async function createNGO() {
  const name = document.getElementById('ngo-name').value;
  const description = document.getElementById('ngo-description').value;
  const category = document.getElementById('ngo-category').value;
  const location = document.getElementById('ngo-location').value;
  const contact = document.getElementById('ngo-contact').value;
  const mission = document.getElementById('ngo-mission').value;
  const message = document.getElementById('ngo-message');

  // Get user id from token
  const userId = JSON.parse(atob(token.split('.')[1])).userId;

  try {
    const response = await fetch('http://localhost:3000/api/ngo/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        description,
        category,
        location,
        contact,
        mission,
        createdBy: userId
      })
    });

    const data = await response.json();

    if (response.ok) {
      message.style.color = 'green';
      message.textContent = 'NGO Profile created successfully! 🎉';
      localStorage.setItem('ngoId', data.ngo._id);
      loadRequests(data.ngo._id);
    } else {
      message.style.color = 'red';
      message.textContent = data.message;
    }

  } catch (error) {
    message.textContent = 'Something went wrong!';
  }
}

// Load Collaboration Requests
async function loadRequests(ngoId) {
  try {
    const response = await fetch(`http://localhost:3000/api/collaboration/requests/${ngoId}`);
    const requests = await response.json();

    const list = document.getElementById('requests-list');

    if (requests.length === 0) {
      list.innerHTML = '<p class="no-requests">No collaboration requests yet</p>';
      return;
    }

    list.innerHTML = '';

    requests.forEach(req => {
      list.innerHTML += `
        <div class="request-card">
          <div class="request-info">
            <h3>${req.senderNGO.name}</h3>
            <p>📍 ${req.senderNGO.location}</p>
            <p>🏷️ ${req.senderNGO.category}</p>
            <p class="request-message">"${req.message}"</p>
          </div>
          <div class="request-status status-${req.status}">
            ${req.status.toUpperCase()}
          </div>
          ${req.status === 'pending' ? `
            <div class="request-actions">
              <button class="btn-accept" onclick="acceptRequest('${req._id}')">✅ Accept</button>
              <button class="btn-reject" onclick="rejectRequest('${req._id}')">❌ Reject</button>
            </div>
          ` : ''}
        </div>
      `;
    });

  } catch (error) {
    console.log('Error loading requests:', error);
  }
}

// Accept Request
async function acceptRequest(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/collaboration/accept/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      alert('Collaboration accepted! 🎉');
      const ngoId = localStorage.getItem('ngoId');
      loadRequests(ngoId);
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

// Reject Request
async function rejectRequest(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/collaboration/reject/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      alert('Collaboration rejected!');
      const ngoId = localStorage.getItem('ngoId');
      loadRequests(ngoId);
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

// Logout
function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

// Load requests if ngoId exists
const ngoId = localStorage.getItem('ngoId');
if (ngoId) {
  loadRequests(ngoId);
}