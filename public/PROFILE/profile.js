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

// Role options based on institution type
const roleOptions = {
    school: [
        { value: 'principal', label: 'Principal' },
        { value: 'vice_principal', label: 'Vice Principal' },
        { value: 'transport_incharge', label: 'Transport Incharge' },
        { value: 'teacher', label: 'Teacher' },
        { value: 'staff', label: 'Staff' }
    ],
    college: [
        { value: 'principal', label: 'Principal' },
        { value: 'vice_principal', label: 'Vice Principal' },
        { value: 'transport_incharge', label: 'Transport Incharge' },
        { value: 'professor', label: 'Professor' },
        { value: 'staff', label: 'Staff' }
    ]
};

// Update role options based on selected institution type
function updateRoles() {
    const institutionType = document.getElementById('institutionType').value;
    const roleSelect = document.getElementById('role');
    
    // Clear existing options
    roleSelect.innerHTML = '<option value="">Select Role</option>';
    
    if (institutionType) {
        // Add new options based on institution type
        roleOptions[institutionType].forEach(role => {
            const option = document.createElement('option');
            option.value = role.value;
            option.textContent = role.label;
            roleSelect.appendChild(option);
        });
    }
    
    checkSaveButton();
}

// Handle file change
function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            document.querySelector(".profile-image").src = reader.result;
            checkSaveButton();
        };
        reader.readAsDataURL(file);
    }
}

// Handle edit click
function handleEditClick() {
    document.getElementById("fileInput").click();
}

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

// Check if any field has been modified
function checkSaveButton() {
    const saveButton = document.getElementById("saveButton");
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const role = document.getElementById("role").value;

    // Enable save button if any field has been modified
    const hasChanges = oldPassword || newPassword || confirmPassword || 
                      fullName || email || phone || role;

    saveButton.disabled = !hasChanges;
}

// Handle form submission
function handleSubmit() {
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const role = document.getElementById("role").value;

    // Validate required fields
    if (!fullName || !email || !phone || !role) {
        alert("Please fill in all required fields!");
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    // Validate phone number format
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit phone number!");
        return;
    }

    // Validate password if being changed
    if (newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters long!");
            return;
        }
    }

    // Here you would typically send the data to your backend
    alert("Profile updated successfully!");
    
    // Reset form
    document.getElementById("oldPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
    document.getElementById("saveButton").disabled = true;
}

// Add event listeners for form validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('input', checkSaveButton);
    });
});

// Password Dialog Functions
function openPasswordDialog() {
  const dialog = document.getElementById('passwordDialog');
  dialog.style.display = 'block';
}

function closePasswordDialog() {
  const dialog = document.getElementById('passwordDialog');
  dialog.style.display = 'none';
  // Clear password fields
  document.getElementById('currentPassword').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmPassword').value = '';
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  const icon = input.nextElementSibling;
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.textContent = 'visibility_off';
  } else {
    input.type = 'password';
    icon.textContent = 'visibility';
  }
}

async function updatePassword() {
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validate passwords
  if (newPassword !== confirmPassword) {
    alert('New passwords do not match');
    return;
  }

  if (newPassword.length < 8) {
    alert('Password must be at least 8 characters long');
    return;
  }

  try {
    const response = await fetch('/api/update-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Password updated successfully');
      closePasswordDialog();
    } else {
      alert(data.message || 'Failed to update password');
    }
  } catch (error) {
    console.error('Error updating password:', error);
    alert('An error occurred while updating password');
  }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  const changePasswordBtn = document.getElementById('changePasswordBtn');
  const closeDialogBtn = document.getElementById('closeDialog');
  const cancelBtn = document.getElementById('cancelBtn');
  const savePasswordBtn = document.getElementById('savePasswordBtn');

  if (changePasswordBtn) {
    changePasswordBtn.addEventListener('click', openPasswordDialog);
  }

  if (closeDialogBtn) {
    closeDialogBtn.addEventListener('click', closePasswordDialog);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', closePasswordDialog);
  }

  if (savePasswordBtn) {
    savePasswordBtn.addEventListener('click', updatePassword);
  }
});