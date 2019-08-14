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

        sessionStorage.removeItem("books");
        sessionStorage.setItem("books", JSON.stringify(this.books));
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
        if(document.getElementById("adding-form").style.display == "block"){
            document.getElementById("adding-form").style.display = "none";
        }
        else{
        document.getElementById("adding-form").style.display = "block";
        }
    //something();
    }
}

function addBookToLibrary(){
    let title = document.getElementById("titleId").value;
    let author = document.getElementById("authorId").value;
    let description = document.getElementById("descriptionId").value;
    let pageCount = document.getElementById("pageCountId").value;
    lib.registerBook(new Book(title, author, pageCount, description));

    document.getElementById("adding-form").style.display = "none";
    something();
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

function generateBooks() {
    for(let i = 0; i < 10; i++){
        lib.registerBook(new Book());
    }

    sessionStorage.setItem("books", JSON.stringify(lib.books));
}

function something() {

    let user = JSON.parse(sessionStorage.getItem('authInfo'));

    let books = JSON.parse(sessionStorage.getItem("books"));
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
    if(getRoles()[user.role].issueBook){
        let th6 = document.createElement('th');
        trh.appendChild(th6);
    }
    if(getRoles()[user.role].recommendBook){
        let th7 = document.createElement('th');
        trh.appendChild(th7);
    }

    table.appendChild(trh);

    for (let i = 0; i < books.length; i++){
        let book = books[i];

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

        if(getRoles()[user.role].issueBook){
            let td6 = document.createElement('td');
            td6.id = "takeId";
            td6.addEventListener("click", function () {
                if(td6.innerText == "Taken"){
                    td6.innerText = "Take";
                    td6.style.background = "darkgrey";
                    books[i].taken = false;
                }
                else{
                    td6.innerText = "Taken";
                    td6.style.background = "chocolate";
                    books[i].taken = true;
                    books[i].takeDate = new Date().toString().slice(0, 21);
                    //user.bookHistory.add(books[i]);
                    //console.log(books[i].takeDate);
                }
                sessionStorage.setItem("books", JSON.stringify(books))

            });
            if(book.taken){
                td6.innerText = "Taken";
                td6.style.background = "chocolate"
            }
            else{td6.appendChild(document.createTextNode("Take"));}
            tr.appendChild(td6);
        }

        if(getRoles()[user.role].recommendBook){
            let td7 = document.createElement('td');
            td7.id = "recommendId";
            td7.addEventListener("click", function () {
                if(td7.innerText == "Recommended"){
                    td7.innerText = "Recommend";
                    td7.style.background = "darkgrey"
                    books[i].recommended = false;
                }
                else{
                    td7.innerText = "Recommended";
                    td7.style.background = "chocolate"
                    books[i].recommended = true;
                    //console.log(book.id);
                }
                sessionStorage.setItem("books", JSON.stringify(books));

            });
            if(book.recommended){
                td7.innerText = "Recommended";
                td7.style.background = "chocolate"
            }
            else{td7.appendChild(document.createTextNode("Recommend"));}

            tr.appendChild(td7);
        }

        table.appendChild(tr);
    }
    document.body.appendChild(table);

}

function showRecommend() {
    let user = JSON.parse(sessionStorage.getItem('authInfo'));

    let books = JSON.parse(sessionStorage.getItem("books"));
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

    if(getRoles()[user.role].issueBook){
        let th6 = document.createElement('th');
        trh.appendChild(th6);
    }
    table.appendChild(trh);

    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        if(!book.recommended){
            continue;
        }

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

        if (getRoles()[user.role].issueBook) {
            let td6 = document.createElement('td');
            td6.id = "takeId";
            td6.addEventListener("click", function () {
                if (td6.innerText == "Taken") {
                    td6.innerText = "Take";
                    td6.style.background = "darkgrey";
                    books[i].taken = false;
                } else {
                    td6.innerText = "Taken";
                    td6.style.background = "chocolate";
                    books[i].taken = true;
                    books[i].takeDate = new Date().toString().slice(0, 21);
                    //user.bookHistory.add(books[i]);
                    //console.log(books[i].takeDate);
                }
                sessionStorage.setItem("books", JSON.stringify(books));

            });
            if(book.taken){
                td6.innerText = "Taken";
                td6.style.background = "chocolate"
            }
            else{td6.appendChild(document.createTextNode("Take"));}
            tr.appendChild(td6);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

function showTakenBooks() {
    let user = JSON.parse(sessionStorage.getItem('authInfo'));

    let books = JSON.parse(sessionStorage.getItem("books"));
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

    if(getRoles()[user.role].returnBook){
        let th6 = document.createElement('th');
        trh.appendChild(th6);
    }
    table.appendChild(trh);

    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        if(!book.taken){
            continue;
        }

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

        if (getRoles()[user.role].returnBook) {
            let td6 = document.createElement('td');
            td6.id = "returnId";
            td6.addEventListener("click", function () {
                if (td6.innerText == "Returned") {
                    td6.innerText = "Return";
                    td6.style.background = "darkgrey";
                    books[i].taken = true;
                } else {
                    td6.innerText = "Returned";
                    td6.style.background = "chocolate";
                    books[i].taken = false;
                    books[i].returnDate = new Date().toString().slice(0, 21);

                    //console.log(books[i].returnDate);
                }
                sessionStorage.setItem("books", JSON.stringify(books))

            });
            td6.appendChild(document.createTextNode("Return"));
            tr.appendChild(td6);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

function viewHistory() {
    let user = JSON.parse(sessionStorage.getItem('authInfo'));

    let books = Array.from(user.bookHistory);
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
    let th6 = document.createElement('th');


    th1.appendChild(document.createTextNode("ID"));
    th2.appendChild(document.createTextNode("Title"));
    th3.appendChild(document.createTextNode("Author"));
    th4.appendChild(document.createTextNode("Pages"));
    th5.appendChild(document.createTextNode("Take Date"));
    th6.appendChild(document.createTextNode("Return Date"));

    trh.appendChild(th1);
    trh.appendChild(th2);
    trh.appendChild(th3);
    trh.appendChild(th4);
    trh.appendChild(th5);
    trh.appendChild(th6);

    table.appendChild(trh);

    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        if(!book.taken){
            continue;
        }

        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');


        td1.appendChild(document.createTextNode(book.id));
        td2.appendChild(document.createTextNode(book.title));
        td3.appendChild(document.createTextNode(book.author));
        td4.appendChild(document.createTextNode(book.pageCount));
        td5.appendChild(document.createTextNode(book.takeDate));
        td6.appendChild(document.createTextNode(book.returnDate));


        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

function searchBook() {

}

function bookPage() {
    document.getElementById("table").style.display = "none";

    document.getElementById("book-manage").style.display = "block";
    document.getElementById("book-nav-button").style.background = "chocolate";
    document.getElementById("user-manage").style.display = "none";
    document.getElementById("user-nav-button").style.background = "none";
    document.getElementById("role-manage").style.display = "none";
    document.getElementById("role-nav-button").style.background = "none";
}

function userPage() {
    document.getElementById("table").style.display = "none";
    document.getElementById("book-manage").style.display = "none";
    document.getElementById("book-nav-button").style.background = "none";
    document.getElementById("user-manage").style.display = "block";
    document.getElementById("user-nav-button").style.background = "chocolate";
    document.getElementById("role-manage").style.display = "none";
    document.getElementById("role-nav-button").style.background = "none";
}

function rolePage() {
    document.getElementById("table").style.display = "none";
    document.getElementById("book-manage").style.display = "none";
    document.getElementById("book-nav-button").style.background = "none";
    document.getElementById("user-manage").style.display = "none";
    document.getElementById("user-nav-button").style.background = "none";
    document.getElementById("role-manage").style.display = "block";
    document.getElementById("role-nav-button").style.background = "chocolate";
}

"use strict"
function getRoles()
{
    return {
        'student': {
            'issueBook': true,
            'renewBook': true,
            'returnBook': true,
            'viewHistory': true,
            'recommendBook': false,
            'searchBook': true,
            'addBook': false,
            'addUser': false,
            'editUser': false,
            'removeUser': false,
            'acceptHold': false,
            'acceptRenew': false,
            'acceptReturn': false
        },
        'faculty': {
            'issueBook': true,
            'renewBook': true,
            'returnBook': true,
            'viewHistory': true,
            'recommendBook': true,
            'searchBook': true,
            'addBook': false,
            'addUser': false,
            'editUser': false,
            'removeUser': false,
            'acceptHold': false,
            'acceptRenew': false,
            'acceptReturn': false
        },
        'admin': {
            'issueBook': false,
            'renewBook': false,
            'returnBook': false,
            'viewHistory': false,
            'recommendBook': false,
            'searchBook': true,
            'addBook': true,
            'addUser': true,
            'editUser': true,
            'removeUser': true,
            'acceptHold': true,
            'acceptRenew': true,
            'acceptReturn': true
        }
    };
}



