const bookListDiv = document.querySelector('.book-list');
const addBookBtn = document.querySelector('.add-book');
const newDialogWindow = document.querySelector('dialog');
const closeDialogBtn = document.querySelector('.close-dialog');
const submitDialogBtn = document.querySelector('.submit-dialog');
const form = document.querySelector('form');
const dialogAlert = document.querySelector('.dialog-alert');

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    bookListDiv.innerHTML = "";
    for (let i in myLibrary) {
        let bookDiv = document.createElement('div');
        let p = document.createElement('p');
        let deleteBtn = document.createElement('button');
        let changeBtn = document.createElement('button');


        bookDiv.append(p, deleteBtn, changeBtn);
        bookListDiv.appendChild(bookDiv);

        p.textContent = `${myLibrary[i].title} by ${myLibrary[i].author},
        ${myLibrary[i].pages} pages`;

        bookDiv.setAttribute("class", "book-div");
        deleteBtn.textContent = "Delete"
        deleteBtn.setAttribute("value", i);
        deleteBtn.addEventListener('click', deleteBook);
        changeBtn.textContent = `${myLibrary[i].read ? 'Read' : 'Not Read'}`
        changeBtn.setAttribute('value', i);
        changeBtn.addEventListener('click', readBook);
    }
}

function readBook() {
    myLibrary[this.value].read==true ? myLibrary[this.value].read = false : myLibrary[this.value].read = true;
    displayBooks();

}

function deleteBook(event) {
    myLibrary.splice(this.value, 1);
    displayBooks();
}

submitDialogBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (form.title.value != '' &&
        form.author.value != '' &&
        form.pages.value != '' &&
        form.read.value != '') {
        let newBook = new Book(form.title.value,
            form.author.value,
            form.pages.value,
            form.read.value
        )
        addBookToLibrary(newBook);
        displayBooks();
        newDialogWindow.close();
        form.reset();
    }
    else {
        dialogAlert.textContent = "Please enter all required fields."
    }
})

closeDialogBtn.addEventListener('click', () => {
    form.reset();
    newDialogWindow.close();
})

addBookBtn.addEventListener('click', () => newDialogWindow.showModal());

let hobbit = new Book("The Hobbit", "J.R.R. Tolkein", 300, false);
let playerOne = new Book("Ready Player One", "Ernest Cline", 374, true);

addBookToLibrary(hobbit);
addBookToLibrary(playerOne);

displayBooks();