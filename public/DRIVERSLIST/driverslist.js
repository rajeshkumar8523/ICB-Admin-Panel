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

function openDownloadModal() {
    document.getElementById("downloadModal").style.display = "block";
}

function closeDownloadModal() {
    document.getElementById("downloadModal").style.display = "none";
}

function downloadPDF() {
    alert("Downloading PDF...");
    closeDownloadModal();
}

function downloadExcel() {
    alert("Downloading Excel...");
    closeDownloadModal();
}

 // Mock employee data
 const employees = [
    { id: 12345, name: "Ravi Kumar", email: "ravi.kumar@example.com", designation: "Software Engineer" },
    { id: 54321, name: "Priya Sharma", email: "priya.sharma@example.com", designation: "Product Manager" },
    { id: 67890, name: "Anil Mehta", email: "anil.mehta@example.com", designation: "Designer" },
    { id: 23456, name: "Sneha Patel", email: "sneha.patel@example.com", designation: "QA Engineer" },
    { id: 98765, name: "Amit Verma", email: "amit.verma@example.com", designation: "DevOps Engineer" },
    { id: 34567, name: "Neha Singh", email: "neha.singh@example.com", designation: "HR Manager" },
    { id: 45678, name: "Vikas Gupta", email: "vikas.gupta@example.com", designation: "Marketing Specialist" },
  ];

  let selectedEmployeeId = null;

  // Render employee cards
  function renderEmployeeCards() {
    const container = document.getElementById("employeeListContainer");
    container.innerHTML = employees.map(employee => `
      <div class="card">
        <div class="profile">
          <div class="profileIcon">
            <i class="fas fa-user-circle" style="font-size: 130px; color: grey;"></i>
          </div>
          <div class="boxes"><b>ID</b>: ${employee.id}</div>
          <div class="boxes"><b>Name</b>: ${employee.name}</div>
          <div class="boxes"><b>Designation</b>: ${employee.designation}</div>
          <div class="boxes"><b>Email</b>: ${employee.email}</div>
        </div>
        <div class="actions">
          <button class="actionBtn" onclick="handleActionClick(this)">Action</button>
        </div>
      </div>
    `).join("");
  }

  // Handle action button click
  function handleActionClick(button) {
    const actionsDiv = button.parentElement;
    actionsDiv.innerHTML = `
      <button class="suspendBtn" onclick="handleSuspendClick(${button.parentElement.parentElement.querySelector(".boxes").textContent.split(": ")[1]})">Suspend</button>
      <button class="editBtn" onclick="handleEditClick(this)">Edit</button>
    `;
  }

  // Handle suspend button click
  function handleSuspendClick(id) {
    selectedEmployeeId = id;
    document.getElementById("suspensionPopup").style.display = "block";
  }

  // Handle confirm suspension
  function handleConfirmSuspend() {
    const password = document.getElementById("passwordInput").value;
    if (password === "admin123") {
      employees = employees.filter(employee => employee.id !== selectedEmployeeId);
      renderEmployeeCards();
      document.getElementById("suspensionPopup").style.display = "none";
      alert("Employee suspended successfully!");
    } else {
      document.getElementById("errorMessage").textContent = "Incorrect password!";
    }
  }

  // Handle cancel suspension
  function handleCancel() {
    document.getElementById("suspensionPopup").style.display = "none";
    alert("Suspension Cancelled!");
  }

  // Handle edit button click
  function handleEditClick(button) {
    const card = button.closest(".card");
    const boxes = card.querySelectorAll(".boxes");
    boxes.forEach(box => {
      const value = box.textContent.split(": ")[1];
      box.innerHTML = `<b>${box.textContent.split(": ")[0]}</b>: <input type="text" value="${value}" class="input">`;
    });
    button.textContent = "Publish";
    button.classList.remove("editBtn");
    button.classList.add("saveBtn");
    button.onclick = () => handleSaveClick(card);
  }

  // Handle save button click
  function handleSaveClick(card) {
    const boxes = card.querySelectorAll(".boxes");
    boxes.forEach(box => {
      const input = box.querySelector("input");
      box.innerHTML = `<b>${box.textContent.split(": ")[0]}</b>: ${input.value}`;
    });
    alert("Employee details updated successfully!");
  }

  // Download PDF
  function downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(12);
    const columns = ["Employee ID", "Employee Name", "Employee Email", "Employee Designation"];
    const rows = employees.map(employee => [employee.id, employee.name, employee.email, employee.designation]);
    doc.autoTable({ head: [columns], body: rows, margin: { top: 30 }, theme: "grid" });
    doc.save("all_employees.pdf");
    closeDownloadModal();
  }

  // Download Excel
  function downloadExcel() {
    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelFile]), "all_employees.xlsx");
    closeDownloadModal();
  }

  // Open download modal
  function openDownloadModal() {
    document.getElementById("downloadModal").style.display = "block";
  }

  // Close download modal
  function closeDownloadModal() {
    document.getElementById("downloadModal").style.display = "none";
  }

  // Initial render
  renderEmployeeCards();