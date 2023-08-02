document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const bookSection = document.querySelector(".book-section");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Perform validation and authentication on the server-side.
    // For demonstration purposes, we assume the login is successful.
    if (username === "aakriti" && password === "aakriti") {
      loginForm.style.display = "none";
      bookSection.style.display = "block";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });

  const bookForm = document.getElementById("book-form");
  const bookTable = document.getElementById("book-table");

  bookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const isbn = document.getElementById("isbn").value;
    const bookTitle = document.getElementById("book-title").value;

    // You can retrieve other book details here and send them to the server-side for handling.

    // Add a new row to the book table with the book's ISBN and title.
    const newRow = bookTable.insertRow();
    const isbnCell = newRow.insertCell(0);
    const bookTitleCell = newRow.insertCell(1);
    const deleteButtonCell = newRow.insertCell(2);

    isbnCell.textContent = isbn;
    bookTitleCell.textContent = bookTitle;
    deleteButtonCell.innerHTML = '<button onclick="deleteBook(this)">Delete</button>';

    // Clear the input fields after adding the book to the table.
    bookForm.reset();
  });
});

function deleteBook(button) {
  // Get the row containing the delete button and remove it from the table.
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}
