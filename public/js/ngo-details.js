// Get NGO id from URL
const params = new URLSearchParams(window.location.search);
const ngoId = params.get('id');

// Load NGO details
async function loadNGODetails() {
  try {
    const response = await fetch(`http://localhost:3000/api/ngo/${ngoId}`);
    const ngo = await response.json();

    const details = document.getElementById('ngo-details');

    details.innerHTML = `
      <div class="details-header">
        <h1>${ngo.name}</h1>
        <span class="category-badge">${ngo.category}</span>
      </div>

      <div class="details-body">
        <div class="detail-item">
          <h3>📋 Description</h3>
          <p>${ngo.description}</p>
        </div>

        <div class="detail-item">
          <h3>🎯 Mission</h3>
          <p>${ngo.mission}</p>
        </div>

        <div class="detail-item">
          <h3>📍 Location</h3>
          <p>${ngo.location}</p>
        </div>

        <div class="detail-item">
          <h3>📧 Contact</h3>
          <p>${ngo.contact}</p>
        </div>
      </div>

      <div class="details-footer">
        <button class="btn-full" onclick="collaborate('${ngo._id}')">
          🤝 Request Collaboration
        </button>
        <a href="explore.html" class="btn-back">← Back to Explore</a>
      </div>
    `;

  } catch (error) {
    console.log('Error loading NGO details:', error);
  }
}

// Collaborate function
async function collaborate(receiverNGO) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login first to collaborate!');
    window.location.href = 'login.html';
    return;
  }

  const senderNGO = localStorage.getItem('ngoId');
  if (!senderNGO) {
    alert('Only NGOs can send collaboration requests!');
    return;
  }

  const message = prompt('Enter a message for collaboration request:');
  if (!message) return;

  try {
    const response = await fetch('http://localhost:3000/api/collaboration/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ senderNGO, receiverNGO, message })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Collaboration request sent successfully! 🎉');
    } else {
      alert(data.message);
    }

  } catch (error) {
    alert('Something went wrong!');
  }
}

loadNGODetails();