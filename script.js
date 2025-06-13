let myLibrary = [];
const libraryContainer = document.querySelector(".libContainer");
function addChild() {
    document.getElementById('form1').style.display = 'block';
}
libraryContainer.setAttribute("style", "display: flex; flex-wrap: wrap; max-width: 800px;")
const btn = document.querySelector('#submit');
btn.addEventListener("click", btnClick, false);

function btnClick(event){
  event.preventDefault();
    title = document.querySelector('#title').value; 
    author = document.querySelector('#author').value;
    numpages = document.querySelector('#numpages').value;
    read = document.querySelector('#read').value;
    book = new Book(crypto.randomUUID(),title, author, numpages, read)
    myLibrary.push(book);
    displayBook(myLibrary);
    title = "";
    author ="";
    numpages = "";
    read = "";
  }

function Book(id, title, author, numpages, read) {
    this.id = id;
    this.title =title;
    this.author=author;
    this.numpages=numpages;
    this.read = read;
}

function displayBook(myLibrary) {
  libraryContainer.innerHTML = ""; 

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-id", book.id);
    bookCard.setAttribute("style", "border: 1px solid black; border-radius: 8px; padding: 8px; margin: 12px; width: 200px;")
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.numpages}</p>
      <p><strong>Read:</strong> ${book.read === "yes" ? "Yes" : "No"}</p>
      <button class="remove-btn">Remove</button>
      <button class="toggle-read-status-btn">Toggle Read Status</button>
    `;
    libraryContainer.appendChild(bookCard);

    // Select the remove button inside the current card
    const removeBtn = bookCard.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      removeBookFromLibrary(book.id);
    });

    // Optional: attach toggle-read logic here too
    const toggleBtn = bookCard.querySelector(".toggle-read-status-btn");
    toggleBtn.addEventListener("click", () => {
      toggleBookReadStatus(book.id);
    });
  });
}

function removeBookFromLibrary(id) {
  myLibrary = myLibrary.filter(book => book.id !== id);
  displayBook(myLibrary); // Refresh the display
}

function toggleBookReadStatus(id) {
  const book = myLibrary.find(b => b.id === id);
  if (book) {
    book.read = book.read === "yes" ? "no" : "yes";
    displayBook(myLibrary); // Refresh the display
  }
}
