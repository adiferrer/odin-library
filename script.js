let myLibrary = [
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
    this.datePublished = datePublished;
    this.isRead = isRead;

    this.info = function() {
        return `${title} by ${author}, published ${datePublished}, ${isRead ? "read" : "not yet read"}`;
    }
}

function addBookToLibrary() { 
}

function displayBooks() {
    const libraryDisplay = document.getElementById('library');

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.className = 'library-book';
        
        for (property in book) {
            const textDiv = document.createElement('div'); 
            let text;

            if (property !== 'imageSrc' && property !== 'isRead') {
                text = document.createTextNode(`${book[property]}`);
            } else if (property === 'isRead') {
                text = document.createTextNode(`${book[property] ? "read" : "not yet read"}`);
            }

            textDiv.appendChild(text);
            card.appendChild(textDiv);
        }

        libraryDisplay.appendChild(card);  
    });
}

displayBooks();

const addBook = document.getElementById("add-book");
addBook.addEventListener('click', () => {
    
})