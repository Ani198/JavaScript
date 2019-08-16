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
/*
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
    };*/

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
            document.getElementById("add-message").style.display = "none";
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

    if(title == "" || author == "" || description == "" || pageCount == ""){
        document.getElementById("add-message").style.display = "block";
    }
    else{
        //lib.registerBook(new Book(title, author, pageCount, description));
        let books = JSON.parse(sessionStorage.getItem("books"));
        console.log(books);
        books.push(new Book(title, author, pageCount, description));
        sessionStorage.setItem("books", JSON.stringify(books));

        document.getElementById("adding-form").style.display = "none";
        something();
    }

    document.getElementById("titleId").value = "";
    document.getElementById("authorId").value = "";
    document.getElementById("descriptionId").value = "";
    document.getElementById("pageCountId").value = "";
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
    /*let books = [];
    if(JSON.parse(sessionStorage.getItem("books")) !== null){
        books = JSON.parse(sessionStorage.getItem("books"));
    }*/
    for(let i = 0; i < 10; i++){
        lib.registerBook(new Book());
    }

    sessionStorage.setItem("books", JSON.stringify(lib.books));

    document.getElementById("gen-books").style.background = "chocolate";


}

function something() {

    let user = JSON.parse(sessionStorage.getItem('authInfo'));

    let books = JSON.parse(sessionStorage.getItem("books"));

    let users = JSON.parse(sessionStorage.getItem("users"));

    let fullUser;
    for(let us of users){
        if(us.username == user.username)
            fullUser = us;
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
                if(td6.innerText == "Request was sent"){
                    td6.innerText = "Take";
                    td6.style.background = "darkgrey";
                    books[i].takeRequest = false;
                    for(let i = 0; i < users.length; i++){
                        if(users[i].username == user.username){
                            for(let j = 0; j < fullUser.requests.length; j++){
                                if(fullUser.requests[j].book.id == book.id){
                                    fullUser.requests.splice(j, 1);
                                    users[i] = fullUser;
                                }
                            }
                        }
                        //console.log(users[i].requests.length)
                    }
                    sessionStorage.setItem("users", JSON.stringify(users));
                    //books[i].taken = false;
                }
                else{
                    td6.innerText = "Request was sent";
                    td6.style.background = "chocolate";
                    books[i].takeRequest = true;
                    for(let i = 0; i < users.length; i++){
                        if(users[i].username == user.username){
                            users[i].requests.push(new RequestClass(book, "take"));
                        }
                        //console.log(users[i].requests.length)
                    }
                    sessionStorage.setItem("users", JSON.stringify(users));
                    //books[i].taken = true;
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
            else if(book.takeRequest || book.returnRequest){
                td6.innerText = "Request was sent";
                if(!bookInUserResuests(fullUser, book)){
                    td6.style.background = "red";
                    td6.style.pointerEvents = 'none';
                }
                else{
                    td6.style.background = "chocolate"
                    td6.style.pointerEvents = 'auto';
                }
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

// check if book is in user's requests
function bookInUserResuests(user, book) {
    //let requests = user.requests;
    let t = false;
    for(let req of user.requests){
        if(req.book.id == book.id){
            t = true;
            break;
        }
    }
    return t;
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
                if (td6.innerText == "Take Request was sent") {
                    td6.innerText = "Take";
                    td6.style.background = "darkgrey";
                    books[i].takeRequest = false;
                    //books[i].taken = false;
                } else {
                    td6.innerText = "Take Request was sent";
                    td6.style.background = "chocolate";
                    books[i].takeRequest = true;
                    console.log(user);
                    let users = JSON.parse(sessionStorage.getItem("users"));
                    for(let i = 0; i < users.length; i++){
                        if(users[i].username == user.username){
                            users[i].requests.push(new RequestClass(book, "take"));
                        }
                        console.log(users[i].requests)
                    }
                    sessionStorage.setItem("users", JSON.stringify(users));

                    //books[i].taken = true;
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
            let users = JSON.parse(sessionStorage.getItem("users"));
            let td6 = document.createElement('td');
            td6.id = "returnId";
            td6.addEventListener("click", function () {
                if (td6.innerText == "Return Request was sent") {
                    td6.innerText = "Return";
                    td6.style.background = "darkgrey";
                    books[i].returnRequest = false;
                    //books[i].taken = true;
                } else {
                    td6.innerText = "Return Request was sent";
                    td6.style.background = "chocolate";
                    books[i].returnRequest = true;
                    //books[i].taken = false;

                    for(let j = 0; j < users.length; j++){
                        if(users[j].username == user.username){
                            users[j].requests.push(new RequestClass(book, "return"));
                        }
                    }
                    books[i].returnDate = new Date().toString().slice(0, 21);

                    //console.log(books[i].returnDate);
                }
                sessionStorage.setItem("books", JSON.stringify(books));
                sessionStorage.setItem("users", JSON.stringify(users));

            });
            td6.appendChild(document.createTextNode("Return"));
            tr.appendChild(td6);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

function viewRequests() {
    let user = JSON.parse(sessionStorage.getItem('authInfo'));

    let books = JSON.parse(sessionStorage.getItem("books"));
    let users = JSON.parse(sessionStorage.getItem("users"));
    let tbl = document.getElementById("table");
    if(document.getElementById("body").contains(tbl)){
        document.body.removeChild(tbl);

    }

    let table = document.createElement('table');
    table.id = "table";
    let trh = document.createElement('tr');

    let th1 = document.createElement('th');//username
    let th2 = document.createElement('th');//bookId
    let th3 = document.createElement('th');//title
    let th4 = document.createElement('th');//author
    let th5 = document.createElement('th');//request



    th1.appendChild(document.createTextNode("Usernme"));
    th2.appendChild(document.createTextNode("Book ID"));
    th3.appendChild(document.createTextNode("Title"));
    th4.appendChild(document.createTextNode("Author"));
    th5.appendChild(document.createTextNode("Request"));


    trh.appendChild(th1);
    trh.appendChild(th2);
    trh.appendChild(th3);
    trh.appendChild(th4);
    trh.appendChild(th5);


    if(getRoles()[user.role].acceptHold && getRoles()[user.role].acceptReturn){
        let th6 = document.createElement('th');

        trh.appendChild(th6);

        let th7 = document.createElement('th');

        trh.appendChild(th7);
    }
    table.appendChild(trh);


    for (let i = 0; i < users.length; i++) {
        let us = users[i];

        for(let j = 0; j < us.requests.length; j++){
            let req = us.requests[j];

            let tr = document.createElement('tr');

            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let td5 = document.createElement('td');

            td1.appendChild(document.createTextNode(us.username));
            td2.appendChild(document.createTextNode(req.book.id));
            td3.appendChild(document.createTextNode(req.book.title));
            td4.appendChild(document.createTextNode(req.book.author));
            td5.appendChild(document.createTextNode(req.message));


            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);




        if (getRoles()[user.role].acceptHold && getRoles()[user.role].acceptReturn) {
            let td6 = document.createElement('td');
            td6.id = "acceptId";
            td6.appendChild(document.createTextNode("Accept"));
            td6.addEventListener("click", function () {
                if(td6.innerText == "Accepted"){
                    td6.innerText = "Accept";
                    td6.style.background = "darkgrey";
                    if(req.message == 'take'){
                        req.book.taken = false;

                    }
                    else if(req.message == 'return'){
                        req.book.taken = true;
                        req.takeRequest = false;
                    }

                }
                else{
                    td6.innerText = "Accepted";
                    td6.style.background = "chocolate";
                    if(req.message == 'take'){
                        req.book.taken = true;
                        req.takeRequest = false;
                        us.requests.splice(j, 1);
                        }

                    else if(req.message == 'return'){
                        req.book.taken = false;
                        req.returnRequest = false;
                        us.requests.splice(j, 1);
                    }


                }
                for(let u = 0; u < users.length; u++){
                    if(users[u].username == us.username){
                        users[u] = us;
                    }
                }

                for(let b = 0; b < books.length; b++){
                    if(books[b].id == req.book.id){
                        books[b] = req.book;
                    }
                }


                sessionStorage.setItem("books", JSON.stringify(books));
                sessionStorage.setItem("users", JSON.stringify(users));

            });

            let td7 = document.createElement('td');
            td7.id = "rejectId";
            td7.appendChild(document.createTextNode("Reject"));

            td7.addEventListener("click", function () {
                if(td7.innerText == "Reject"){
                    td7.innerText = "Rejected";
                    td7.style.background = "chocolate";
                    if(req.message == 'take'){

                    }
                    else if(req.message == 'return'){

                    }

                }
                else{
                    td7.innerText = "Rejected";
                    if(req.message == 'take'){

                    }
                    else if(req.message == 'return'){

                    }
                }



                sessionStorage.setItem("books", JSON.stringify(books));

            });

            tr.appendChild(td6);
            tr.appendChild(td7);

        }
        table.appendChild(tr);

        }

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
    let tbl = document.getElementById("table");
    if(document.getElementById("body").contains(tbl)){
        document.getElementById("table").style.display = "none";
    }

    document.getElementById("book-manage").style.display = "block";
    document.getElementById("book-nav-button").style.background = "chocolate";
    document.getElementById("user-manage").style.display = "none";
    document.getElementById("user-nav-button").style.background = "none";
    document.getElementById("role-manage").style.display = "none";
    document.getElementById("role-nav-button").style.background = "none";
}

function userPage() {
    let tbl = document.getElementById("table");
    if(document.getElementById("body").contains(tbl)){
        document.getElementById("table").style.display = "none";
    }
    //document.getElementById("table").style.display = "none";
    document.getElementById("book-manage").style.display = "none";
    document.getElementById("book-nav-button").style.background = "none";
    document.getElementById("user-manage").style.display = "block";
    document.getElementById("user-nav-button").style.background = "chocolate";
    document.getElementById("role-manage").style.display = "none";
    document.getElementById("role-nav-button").style.background = "none";
}

function rolePage() {
    let tbl = document.getElementById("table");
    if(document.getElementById("body").contains(tbl)){
        document.getElementById("table").style.display = "none";
    }
    //document.getElementById("table").style.display = "none";
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
            'addBook': false,
            'addUser': true,
            'editUser': true,
            'removeUser': true,
            'acceptHold': true,
            'acceptRenew': true,
            'acceptReturn': true
        }
    };
}

function adddUser() {
    let regForm = document.getElementById("page-content");
    if(regForm.style.display == "block"){
        regForm.style.display = "none";
    }
    else {
        regForm.style.display = "block";
    }
}

function registerUser() {
    let username = document.getElementById("username").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;



    if(username == "" || firstName == "" || lastName == "" || email == "" || phone == "" || password == ""){
        document.getElementById("reg-message").style.display = "block";
    }
    else{
        let users = JSON.parse(sessionStorage.getItem("users"));
        let passwords = JSON.parse(sessionStorage.getItem("passwords"))
        console.log(users);
        console.log(passwords);
        users.push(new User(username, firstName, lastName, phone, email, role));
        passwords.push(EncryptionHelper.hash(password));
        sessionStorage.setItem("users", JSON.stringify(users));
        sessionStorage.setItem("passwords", JSON.stringify(passwords));

        document.getElementById("reg-form").style.display = "none";
        viewUsers();
    }
}

function viewUsers() {
    let users = JSON.parse(sessionStorage.getItem("users"));

    let currentUser = JSON.parse(sessionStorage.getItem('authInfo'));

    let tbl = document.getElementById("table");
    if(document.getElementById("body").contains(tbl)){
        document.body.removeChild(tbl);
        document.getElementById("page-content").style.display = "none";
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

    th1.appendChild(document.createTextNode("Usename"));
    th2.appendChild(document.createTextNode("First Name"));
    th3.appendChild(document.createTextNode("Last Name"));
    th4.appendChild(document.createTextNode("Phone"));
    th5.appendChild(document.createTextNode("Email"));
    th6.appendChild(document.createTextNode("Role"));

    trh.appendChild(th1);
    trh.appendChild(th2);
    trh.appendChild(th3);
    trh.appendChild(th4);
    trh.appendChild(th5);
    trh.appendChild(th6);

    if(getRoles()[currentUser.role].editUser){
        let th7 = document.createElement('th');
        trh.appendChild(th7);
    }

    if(getRoles()[currentUser.role].removeUser){
        let th8 = document.createElement('th');
        trh.appendChild(th8);
    }

    table.appendChild(trh);

    for (let i = 0; i < users.length; i++) {
        let user = users[i];

        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');


        td1.appendChild(document.createTextNode(user.username));
        td2.appendChild(document.createTextNode(user.firstName));
        td3.appendChild(document.createTextNode(user.lastName));
        td4.appendChild(document.createTextNode(user.phone));
        td5.appendChild(document.createTextNode(user.email));
        td6.appendChild(document.createTextNode(user.role));


        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        if (getRoles()[currentUser.role].editUser) {
            let td7 = document.createElement('td');
            td7.id = "editId";
            td7.appendChild(document.createTextNode("Edit"));
            td7.addEventListener("click", function () {
                document.getElementById("edit-user-form").style.display = "block";
                document.getElementById("edit-username").value = user.username;
                document.getElementById("edit-firstName").value = user.firstName;
                document.getElementById("edit-lastName").value = user.lastName;
                document.getElementById("edit-email").value = user.email;
                document.getElementById("edit-phone").value = user.phone;
                //document.getElementById("edit-role").value = "Student";
                document.getElementById("role-label").innerText = "Role: "+capitalize(user.role);
                sessionStorage.setItem("editting", JSON.stringify(user));
            });
            tr.appendChild(td7);
        }

        if (getRoles()[currentUser.role].removeUser) {
            let td8 = document.createElement('td');
            td8.id = "removeId";
            td8.appendChild(document.createTextNode("Remove"));
            td8.addEventListener("click", function () {
                users.splice(i, 1);
                sessionStorage.setItem("users", JSON.stringify(users));
                viewUsers();
            });
            tr.appendChild(td8);
        }

        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

function editCancel() {
    document.getElementById("edit-user-form").style.display = "none";

}

function edittUser() {
    let edUser = JSON.parse(sessionStorage.getItem("editting"));
    let users = JSON.parse(sessionStorage.getItem("users"));


    edUser.firstName = document.getElementById("edit-firstName").value;
    edUser.lastName = document.getElementById("edit-lastName").value;
    edUser.email = document.getElementById("edit-email").value;
    edUser.phone = document.getElementById("edit-phone").value;
    edUser.role = document.getElementById("edit-role").value;

    for(let i = 0; i<users.length; i++){
        if(users[i].username == edUser.username){
            edUser.username = document.getElementById("edit-username").value;
            users[i] = edUser;
        }
    }

    sessionStorage.setItem("users", JSON.stringify(users));
    editCancel();
    viewUsers();
}





