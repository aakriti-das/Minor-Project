const loginForm = document.getElementById("login-form");
const bookSection = document.querySelector(".book-section");
const tableBody = document.getElementById("table_body");

// admin login
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Perform validation and authentication on the server-side.
  // For demonstration purposes, we assume the login is successful.
  if (username === "a" && password === "a") {
    loginForm.style.display = "none";
    bookSection.style.display = "block";
    loadTable();
  } else {
    alert("Invalid credentials. Please try again.");
  }
});

const items = [];
fetch("http://localhost:8000/book/get_all")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((d) => {
      const { name, isbn } = d;
      console.log(d);
      items.push({ isbn, name });
    });
  });

const loadTable = () => {
  items.forEach((item) => {
    const row = document.createElement("tr");
    for (let key in item) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(item[key]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    const deleteCol = document.createElement("td");

    const deleteText = document.createTextNode("Delete");
    deleteCol.appendChild(deleteText);
    deleteCol.style.color = "red";
    deleteCol.style.cursor = "pointer";
    row.appendChild(deleteCol);

    tableBody.appendChild(row);
  });
};
