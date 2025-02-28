const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');

function toggleSidebar() {
  sidebar.classList.toggle('expanded');
  toggleSidebarBtn.textContent = sidebar.classList.contains('expanded') ? '←' : '→';

  if (!sidebar.classList.contains('expanded')) {
    document.querySelectorAll('.submenu').forEach(submenu => submenu.classList.remove('active'));
  }
}

toggleSidebarBtn.addEventListener('click', toggleSidebar);

function toggleDropdown(submenuId, iconId) {
  if (!sidebar.classList.contains('expanded')) return;
  var submenu = document.getElementById(submenuId);
  var icon = document.getElementById(iconId);
  submenu.classList.toggle("active");
  icon.classList.toggle("rotated");
}



// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13); // Set initial coordinates and zoom level

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker
L.marker([51.5, -0.09]).addTo(map)
  .bindPopup('A sample location.')
  .openPopup();