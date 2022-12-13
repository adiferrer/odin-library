document.querySelector("#datePublished-input").max = new Date().toLocaleDateString('en-ca');
const libraryDisplay = document.getElementById('library');
let myLibrary = [ // array of book objects
    {
        imgSrc: "",
        title: 'Maze Runner',
        author: 'James Dashner',
        datePublished: 'October 6, 2009',
        isRead: true
    },
    {
        imgSrc: "",
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        datePublished: 'June 26, 1997',
        isRead: false
    },
    {
        imgSrc: "",
        title: 'Eye of Minds',
        author: 'James Dashner',
        datePublished: 'October 8, 2013',
        isRead: true
    }
];

class Book {
    constructor(title, author, datePublished, isRead) {
        this.imgSrc = "";
        this.title = title;
        this.author = author;
        this.isRead = (isRead === 'true');
        this.datePublished = datePublished;
    }
    
    info = function() {
        return `${title} by ${author}, published ${datePublished}, ${isRead ? "read" : "not yet read"}`;
    }

    set datePublished (datePublished) {
        let date = new Date(datePublished).toDateString().split(' '); // converts date to words
        return `${date[1]} ${date[2]}, ${date[3]} `;
    }
}

function openForm() { // shows form
    document.getElementById("form-popup").style.display = "flex";
    document.getElementById("open-book-form").disabled = true;
}
  
function closeForm() { // hides form
    document.getElementById("form-popup").style.display = "none";
    document.getElementById("open-book-form").disabled = false;
}

function addBookToLibrary() { // adds a new book
    const newBook = new Book(document.getElementById('title-input').value,
                            document.getElementById('author-input').value,
                            document.getElementById('datePublished-input').value,
                            document.querySelector('input[name="isRead"]:checked').value);
    
    myLibrary.push(newBook);
    displayBook(newBook);
}

function clearForm() { // clears form
    document.getElementById('title-input').value = '';
    document.getElementById('author-input').value = '';
    document.getElementById('datePublished-input').value = '';
    document.querySelector('input[name=isRead]:checked').checked = false;
}

function isRead(isRead, btn) {
    if (isRead) btn.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--footer-color');
    else btn.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--unread-color');
    return isRead ? "read" : "not yet read";
}

function displayBook(book) { 
    const card = document.createElement('div');
    card.className = 'library-book';

    // change read status and remove book buttons
    const actionBtns = document.createElement('div');
    actionBtns.setAttribute('id', book['title']);
    actionBtns.className = 'action-btns';

    for(let b = 1; b <= 2; b++) {
        const button = document.createElement('button');
        button.setAttribute("type", "button");
        let btnContent;

        if (b === 1) {
            button.className = 'read-status';
            btnContent = document.createTextNode(isRead(book['isRead'], button));
            button.addEventListener('click', () => changeReadStatus(button.parentNode.id));
        } else if (b === 2) {
            button.className = 'remove-btn';
            btnContent = document.createElement('img');
            btnContent.setAttribute('src', 'icons/trash-icon.svg');
            button.addEventListener('click', () => removeBook(button.parentNode.id));
        }

        button.appendChild(btnContent);
        actionBtns.appendChild(button);
    }
    card.appendChild(actionBtns);
     
    // displays book and its information in website
    for (const property in book) {
        const bookDiv = document.createElement('div'); 
        let content;

        if (property === 'title') {
            content = document.createTextNode(book[property]);
        } else if (property === 'author') {
            content = document.createTextNode('Written by ' + book[property]);
        } else if (property === 'datePublished') {
            content = document.createTextNode('Published on ' + book[property]);
        } else if (property === 'imgSrc') {
            content = document.createElement('img');
            content.setAttribute('src', 'images/book-placeholder.jpeg');
        } else {
            continue;
        }

        bookDiv.appendChild(content); 
        bookDiv.className = property;
        card.appendChild(bookDiv);
    }

    libraryDisplay.appendChild(card); 
}

function removeBook(title) {
    const books = document.querySelectorAll('.title');
    for (let b = 0; b < books.length; b++) {
        if (books[b].textContent === title) {
            if (confirm("Are you sure you want to delete this book?")) {
                myLibrary.splice(b, 1);
                books[b].parentNode.remove();
            }
            break;
        }
    }
}

function changeReadStatus(title) {
    const books = document.querySelectorAll('.title');
    for (let b = 0; b < books.length; b++) {
        if (books[b].textContent === title) {
            myLibrary[b]['isRead'] = !(myLibrary[b]['isRead']);
            const button = books[b].parentNode.firstChild.firstChild;
            button.textContent = isRead(myLibrary[b]['isRead'], button);
        }
    }
}

if (myLibrary.length > 0) myLibrary.forEach(book => displayBook(book));

const form = document.querySelector("#form-container");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    addBookToLibrary();
    clearForm();
});