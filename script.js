let myLibrary = [];
const libraryContainer = document.querySelector(".libContainer");

function addChild() {
  document.getElementById('form1').setAttribute("style", "display: block;")
}

libraryContainer.setAttribute("style", "display: flex; flex-wrap: wrap;");
const btn = document.querySelector('#submit');
btn.addEventListener("click", btnClick, false);

function btnClick(event) {
  event.preventDefault();
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const numpages = document.querySelector('#numpages');
  const read = document.querySelector('#read').checked; // Use checkbox for read status
  let isValid = true;

  // Validate title
  if (title.value.trim().length < 2) {
    title.setCustomValidity("Title must be at least 2 characters.");
    isValid = false;
  } else {
    title.setCustomValidity("");
  }

  // Validate author
  if (author.value.trim().length < 2) {
    author.setCustomValidity("Author must be at least 2 characters.");
    isValid = false;
  } else {
    author.setCustomValidity("");
  }

  // Validate number of pages
  if (isNaN(numpages.value) || Number(numpages.value) <= 0) {
    numpages.setCustomValidity("Please enter a valid number of pages.");
    isValid = false;
  } else {
    numpages.setCustomValidity("");
  }

  // If any field is invalid, report validity and stop
  if (!isValid) {
    title.reportValidity();
    author.reportValidity();
    numpages.reportValidity();
    return;
  }
  const book = new Book(crypto.randomUUID(), title.value, author.value, numpages.value, read);
  myLibrary.push(book);
  title.value = "";
  author.value = "";
  numpages.value = "";
  displayBooks();
}

class Book {
  constructor(id, title, author, numpages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.numpages = numpages;
    this.read = read; // Boolean
  }
}

function displayBooks() {
  libraryContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-id", book.id);
    bookCard.setAttribute("style", "border: 2px solid black; border-radius: 8px; padding: 8px; margin: 12px; width: 200px; background-color: white;");

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.numpages}</p>
      <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
      <button class="remove-btn">Remove</button>
      <button class="toggle-read-status-btn">Toggle Read Status</button>
    `;

    // Add to DOM
    libraryContainer.appendChild(bookCard);

    // Remove button
    const removeBtn = bookCard.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      removeBookFromLibrary(book.id);
    });

    // Toggle read status button
    const toggleBtn = bookCard.querySelector(".toggle-read-status-btn");
    toggleBtn.addEventListener("click", () => {
      toggleBookReadStatus(book.id);
    });
  });
}

function removeBookFromLibrary(id) {
  myLibrary = myLibrary.filter(book => book.id !== id);
  displayBooks();
}

function toggleBookReadStatus(id) {
  const book = myLibrary.find(b => b.id === id);
  if (book) {
    book.read = !book.read;
    displayBooks();
  }
}
