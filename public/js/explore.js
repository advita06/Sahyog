let allNGOs = [];

// Load all NGOs
async function loadNGOs() {
  try {
    const response = await fetch('http://localhost:3000/api/ngo');
    allNGOs = await response.json();
    displayNGOs(allNGOs);
  } catch (error) {
    console.log('Error loading NGOs:', error);
  }
}

// Display NGOs on page
function displayNGOs(ngos) {
  const grid = document.getElementById('ngo-grid');

  if (ngos.length === 0) {
    grid.innerHTML = '<p style="text-align:center">No NGOs found</p>';
    return;
  }

  grid.innerHTML = '';

  ngos.forEach(ngo => {
    grid.innerHTML += `
      <div class="ngo-card">
        <h3>${ngo.name}</h3>
        <p>${ngo.description}</p>
        <p><strong>📍 Location:</strong> ${ngo.location}</p>
        <p><strong>🏷️ Category:</strong> ${ngo.category}</p>
        <p><strong>📧 Contact:</strong> ${ngo.contact}</p>
        <a href="ngo-details.html?id=${ngo._id}" class="btn">View Details</a>
      </div>
    `;
  });
}

// Filter NGOs by search and category
function filterNGOs() {
  const search = document.getElementById('search').value.toLowerCase();
  const category = document.getElementById('filter').value;

  const filtered = allNGOs.filter(ngo => {
    const matchesSearch = ngo.name.toLowerCase().includes(search);
    const matchesCategory = category === '' || ngo.category === category;
    return matchesSearch && matchesCategory;
  });

  displayNGOs(filtered);
}

loadNGOs();