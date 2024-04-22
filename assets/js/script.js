// Data for the table
const tableData = [
  { id: 1, imgSrc: "...", marka: "Mark", model: "Otto", price: "@mdo" },
  { id: 2, imgSrc: "...", marka: "Jacob", model: "Thornton", price: "@fat" },
  {
    id: 3,
    imgSrc: "...",
    marka: "Larry the Bird",
    model: "@twitter",
    price: "jnsdc",
  },
];

// Create table element
const table = document.createElement("table");
table.classList.add("table", "mt-5", "mb-5");

// Create table header
const thead = document.createElement("thead");
const headerRow = document.createElement("tr");
["Id", "IMG", "Marka", "Model", "Price", "Action"].forEach((headerText) => {
  const th = document.createElement("th");
  th.scope = "col";
  th.textContent = headerText;
  headerRow.appendChild(th);
});
thead.appendChild(headerRow);
table.appendChild(thead);

// Create table body
const tbody = document.createElement("tbody");
tableData.forEach((item) => {
  const row = document.createElement("tr");

  // Add cell for each data field
  Object.values(item).forEach((value) => {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
  });
  // Add image cell
  const imgCell = document.createElement("td");
  
  // Add action buttons
  const actionCell = document.createElement("td");
  const editBtn = document.createElement("button");
  editBtn.classList.add("btn", "btn-warning", "edit-btn");
  editBtn.textContent = "edit";
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-danger", "delete-btn");
  deleteBtn.textContent = "delete";
  actionCell.appendChild(editBtn);
  actionCell.appendChild(deleteBtn);
  row.appendChild(actionCell);

  tbody.appendChild(row);
});
table.appendChild(tbody);

// Append table to container
document.getElementById("tableContainer").appendChild(table);

// Event listeners for edit and delete buttons
document.querySelectorAll(".edit-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const row = this.closest("tr");
    alert("Edit ID: " + row.cells[0].textContent);
    // Add your edit functionality here
  });
});

document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const row = this.closest("tr");
    alert("Delete ID: " + row.cells[0].textContent);
    // Add your delete functionality here
    row.remove();
  });
});

document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Perform form validation
    const mark = document.getElementById("mark").value.trim();
    const model = document.getElementById("model").value.trim();
    const ban = document.getElementById("ban").value;
    const litr = document.getElementById("litr").value.trim();
    const transmission = document.getElementById("transmission").value;
    const price = document.getElementById("price").value.trim();

    // Check if any field is empty
    if (!mark || !model || !ban || !litr || !transmission || !price) {
      alert("Xahiş olunur boş yer saxlamayın");
      return;
    }
    alert("Maşın qeydiyyata alındı");
});
