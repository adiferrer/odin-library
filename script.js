datePublished.max = new Date().toLocaleDateString('en-ca');
const libraryDisplay = document.getElementById('library');
let myLibrary = [ // array of book objects
    {
        title: 'Maze Runner',
        author: 'James Dashner',
        datePublished: 'October 6, 2009',
        isRead: true
    },
    {
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        datePublished: 'June 26, 1997',
        isRead: false
    },
    {
        title: 'Eye of Minds',
        author: 'James Dashner',
        datePublished: 'October 8, 2013',
        isRead: true
    }
];

function Book(title, author, datePublished, isRead) {
    this.title = title;
    this.author = author;

    const date = new Date(datePublished).toDateString().split(' '); // converts date to words
    this.datePublished = `${date[1]} ${date[2]}, ${date[3]} `;
    this.isRead = isRead;
    this.imgSrc = "";

    this.info = function() {
        return `${title} by ${author}, published ${datePublished}, ${isRead ? "read" : "not yet read"}`;
    }
}

function openForm() { // shows form
    document.getElementById("form-popup").style.display = "block";
    document.getElementById("open-book-form").disabled = true;
}
  
function closeForm() { // hides form
    document.getElementById("form-popup").style.display = "none";
    document.getElementById("open-book-form").disabled = false;
}

function addBookToLibrary() { // adds a new book
    const newBook = new Book(document.getElementById('title').value,
                            document.getElementById('author').value,
                            document.getElementById('datePublished').value,
                            document.querySelector('input[name="isRead"]:checked').value);

    myLibrary.push(newBook);
    displayBook(newBook);
}

function displayBook(book) { 
    const card = document.createElement('div');
    card.className = 'library-book';

    // change read status and remove book buttons
    const actionBtns = document.createElement('div');
    actionBtns.className = 'action-btns';
    for(let b = 1; b <= 2; b++) {
        const button = document.createElement('button');
        button.setAttribute("type", "button");
        let btnText;

        if (b === 1) {
            button.className = 'read-status';
            btnText = document.createTextNode('Read Status');
        } else if (b === 2) {
            button.className = 'remove-btn';
            btnText = document.createTextNode('Remove book');
        }

        button.appendChild(btnText);
        actionBtns.appendChild(button);
    }
    card.appendChild(actionBtns);
     
    // displays book and its information in website
    for (const property in book) {
        const textDiv = document.createElement('div'); 
        let text;

        if (property === 'title' || property === 'author' || property === 'datePublished') {
            text = document.createTextNode(book[property]);
        } else if (property === 'isRead') {
            text = document.createTextNode(`${book[property] ? "read" : "not yet read"}`);
        } else {
            continue;
        }

        textDiv.appendChild(text);  
        card.appendChild(textDiv);
    }

    libraryDisplay.appendChild(card);  
}

function removeBook() {

}

function changeReadStatus() {
    
}

myLibrary.forEach(book => displayBook(book));

const form = document.querySelector("#form-container");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    addBookToLibrary();

    // clear form once submitted
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('datePublished').value = '';
    document.querySelector('input[name=isRead]:checked').checked = false;
});