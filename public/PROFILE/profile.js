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

// JavaScript for functionality
let logoImage = "https://res.cloudinary.com/dagkvnqd9/image/upload/v1726917662/WhatsApp_Image_2024-09-13_at_9.33.52_PM-removebg_oalbnc.png";
let originalImage = logoImage;
let isEditing = false;

// Toggle password visibility
function togglePasswordVisibility(inputId, eyeIconId) {
  const input = document.getElementById(inputId);
  const eyeIcon = document.getElementById(eyeIconId);
  if (input.type === "password") {
    input.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
}

// Handle file change
function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      logoImage = reader.result;
      originalImage = reader.result;
      document.querySelector(".swapna-logo").src = logoImage;
      isEditing = false;
      checkSaveButton();
    };
    reader.readAsDataURL(file);
  }
}

// Handle edit click
function handleEditClick() {
  isEditing = true;
  document.getElementById("fileInput").click();
}

// Handle form submission
function handleSubmit() {
  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword === confirmPassword) {
    if (newPassword.length >= 8) {
      alert("Password updated successfully");
      document.getElementById("oldPassword").value = "";
      document.getElementById("newPassword").value = "";
      document.getElementById("confirmPassword").value = "";
      checkSaveButton();
    } else {
      alert("Password should be at least 8 characters long");
    }
  } else {
    alert("Passwords do not match");
  }
}

// Enable/disable save button
function checkSaveButton() {
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const saveButton = document.getElementById("saveButton");

  if (newPassword !== "" || confirmPassword !== "" || logoImage !== originalImage) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
}

// Attach event listeners
document.getElementById("oldPassword").addEventListener("input", checkSaveButton);
document.getElementById("newPassword").addEventListener("input", checkSaveButton);
document.getElementById("confirmPassword").addEventListener("input", checkSaveButton);