"use strict"


class Library{
    constructor(){
        this.books = [];
        this.takenBooks = [];
        this.authors = new Set();
    }


    // registers book in library
    registerBook(book) {
        this.books.push(book);
        this.authors.add(book.author);
    };

    // prints all books in library
    getAllBooks() {
        for(let book of this.books){
            console.log("ID: " + book.id + ", Title: " + book.title + ", Author: " + book.author + ", Pages: " + book.pageCount + '\n    Content: "' + book.content +'"');
        }
    }

    // returns book by given ID
    getBookByID(bookId) {
        //let exists = false;
        for (let book of this.books){
            if(book.id == bookId){
                return book;
            }
        }
        return 0;
    }

    // prints all authors
    getAllAuthors() {
        for (let aut of this.authors){
            console.log(aut);
        }
    };

    // returns map with <author> as key and <list of author's books> as value
    getAllAuthorsWithBooks() {
        let mapAutBook = new Map();
        for(let aut of this.authors){
            let books = [];
            for(let bk of this.books){
                if(bk.author == aut){
                    books.push(bk);
                }
            }
            mapAutBook.set(aut, books);
        }
        return mapAutBook;
    }

    // prints the books of given author
    getBooksOfAuthor(authorName) {
        console.log("Author: " + authorName+"\nBooks:");
        for (let i of this.getAllAuthorsWithBooks().get(authorName)){
            console.log("   " + i.title);
        }
    };

    // returns map with <author> as key and the <number of author's books> as value
    authorReport() {
        let map = new Map();
        for (let aut of this.authors){
            let numberOfBooks = this.getAllAuthorsWithBooks().get(aut).length;
            map.set(aut, numberOfBooks);
        }
        return map;
    };

    // takes book by given ID
    takeBook(bookId) {
        if(checkItemInArray(bookId, this.takenBooks)){
            console.log("BookId: " + bookId + "     This book is taken now.")
        }
        else if(!Boolean(lib.getBookByID(bookId))){
            console.log("BookId: " + bookId + "     There is no such book in library.")
        }
        else{
            console.log("ID: "+ bookId + "  Taken book: " + this.getBookByID(bookId).title)
            this.takenBooks.push(bookId);
        }
    };

    // returns to library the taken book by given ID
    returnBook(bookId) {
        for (let i = 0; i < this.takenBooks.length; i++){
            let tb = this.takenBooks[i];
            if(tb == bookId){
                console.log("Book with id: " + bookId + " is returned.")
                this.takenBooks.splice(i, 1);
            }
        }
    };

    // prints all taken books
    getAllTakenBooks() {
        for(let tbookId of this.takenBooks){
            for (let bk of this.books){
                if(bk.id == tbookId){
                    console.log(bk.title);
                }
            }

        }
    };

    // finds books which contain the given text
    searchBooksByText(text) {
        for (let book of this.books){
            if(book.description.indexOf(text) != -1){
                console.log("Title: " + book.title + "\nDescription: '" + book.description + "'");
            }
        }
    };

}

const lib = new Library();

function adddBook() {
    let user = JSON.parse(sessionStorage.getItem('authInfo'));
    if(user.role != "admin"){
        alert("You have no permission to add books")
    }
    else{
    lib.registerBook(new Book());
    something();
    }
}


function checkItemInArray(item, arr) {
    let t = false;
    for (let i of arr){
        if(item == i){
            t = true;
        }
    }
    return t;
}

function generateBooks(count) {
    for(let i = 0; i < count; i++){
        lib.registerBook(new Book());
    }
}

function something() {
    if(lib.books.length == 0){
        generateBooks(5)
    }

    let tbl = document.getElementById("table");
    if(document.getElementById("body").contains(tbl)){
        document.body.removeChild(tbl);
    }

    let table = document.createElement('table');
    table.id = "table";
    let trh = document.createElement('tr');

    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    let th4 = document.createElement('th');
    let th5 = document.createElement('th');

    th1.appendChild(document.createTextNode("ID"));
    th2.appendChild(document.createTextNode("Title"));
    th3.appendChild(document.createTextNode("Author"));
    th4.appendChild(document.createTextNode("Pages"));
    th5.appendChild(document.createTextNode("Description"));

    trh.appendChild(th1);
    trh.appendChild(th2);
    trh.appendChild(th3);
    trh.appendChild(th4);
    trh.appendChild(th5);

    table.appendChild(trh);

    for (let i = 0; i < lib.books.length; i++){
        let book = lib.books[i];

        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');

        td1.appendChild(document.createTextNode(book.id));
        td2.appendChild(document.createTextNode(book.title));
        td3.appendChild(document.createTextNode(book.author));
        td4.appendChild(document.createTextNode(book.pageCount));
        td5.appendChild(document.createTextNode(book.description));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        table.appendChild(tr);
    }
    document.body.appendChild(table);

}

