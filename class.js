class Library {

    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(title) {
        const index = this.books.findIndex((book) => book.title === title);
        if (index >= 0) {
            this.books.splice(index, 1);
        }
    }

    getBook(title) {
        return this.books.find((book) => book.title === title);
    }

    getAllBooks() {
        return this.books;
    }
}

class Book {

    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }

    read() {
        this.hasRead === true ? this.hasRead = false : this.hasRead = true;
    }
}

const myLibrary = new Library();

const hobbit = new Book("The Hobbit", "J.R.R. Tolkein", 300, false);
const playerOne = new Book("Ready Player One", "Ernest Cline", 374, true);

myLibrary.addBook(hobbit);
myLibrary.addBook(playerOne);

const bookListDiv = document.querySelector('.book-list');
const addBookBtn = document.querySelector('.add-book');
const newDialogWindow = document.querySelector('dialog');
const closeDialogBtn = document.querySelector('.close-dialog');
const submitDialogBtn = document.querySelector('.submit-dialog');
const form = document.querySelector('form');
const dialogAlert = document.querySelector('.dialog-alert');

function displayBooks() {
    bookListDiv.innerHTML = "";
    const books = myLibrary.getAllBooks();
    for (let book in books) {
        let bookDiv = document.createElement('div');
        let p = document.createElement('p');
        let deleteBtn = document.createElement('button');
        let changeBtn = document.createElement('button');

        bookDiv.append(p, deleteBtn, changeBtn);
        bookListDiv.appendChild(bookDiv);

        p.textContent = `${books[book].title} by ${books[book].author}, ${books[book].pages} pages`
        bookDiv.setAttribute("class", "book-div");
        deleteBtn.textContent = "Delete"
        deleteBtn.setAttribute("value", books[book].title);
        deleteBtn.addEventListener('click', (event) => {
            myLibrary.removeBook(event.target.value);
            console.log(event.target.value);
            displayBooks();
        });
        changeBtn.textContent = `${books[book].hasRead ? 'Read' : 'Not Read'}`
        changeBtn.setAttribute('value', books[book].title);
        changeBtn.addEventListener('click', (event) => {
            const book = myLibrary.getBook(event.target.value);
            book.read();
            displayBooks();
        });
    }
}

displayBooks();

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
        myLibrary.addBook(newBook);
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