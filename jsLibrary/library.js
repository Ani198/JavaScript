"use strict"

function checkItemInArray(item, arr) {
    let t = false;
    for (let i of arr){
        if(item == i){
            t = true;
        }
    }
    return t;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randomWord(){
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let word = "";

    let wordLength = getRndInteger(5, 15);
    for(let i = 0; i < wordLength; i++){
        word += letters[getRndInteger(0, letters.length - 1)];
    }
    return word;
}

function randomPhoneNumber(){
    let numbers = "0123456789";
    let phoneNumber = "";

    for(let i = 0; i < 6; i++){
        phoneNumber += numbers[getRndInteger(0, numbers.length - 1)];
    }
    return phoneNumber;
}

function randomText() {
    let text = "";
    let numberOfWords = getRndInteger(5, 20);
    for(let i = 0; i < numberOfWords; i++){
        let comma = Math.random() < 0.2 ? ",": "";
        text += randomWord() + comma +" ";
    }

    text = text.slice(0, -1);
    if(text[text.length - 1] == ","){
        text = text.slice(0, -1);
    }
    text += "."
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

///////////////////////////////////////////////////////////////////
let authors = [ "William Shakespeare", "Emily Dickinson", "H. P. Lovecraft", "Arthur Conan Doyle",
    "Leo Tolstoy", "Edgar Allan Poe", "Robert Ervin Howard", "Rabindranath Tagore", "Rudyard Kipling",
    "Seneca", "John Donne"];

class Book{
    constructor(id){
        this.id = id;
        this.title = capitalize(randomWord());
        this.author = authors[getRndInteger(0, authors.length - 1)];
        this.pageCount = getRndInteger(2, 500);
        this.content = randomText();
    }
}

class Employee {
    constructor(id){
        this.id = id;
        this.firstName = capitalize(randomWord());
        this.lastName = capitalize(randomWord());
        this.phone = randomPhoneNumber();
        this.email = randomWord()+"@gmail.com";
    }
}

class Library{
    constructor(){
        this.employees = [];
        this.books = [];
        this.takenBooks = [];
        this.authors = new Set();
    }

    // adds employee to library
    addEmployee(employee) {
        this.employees.push(employee);
    };

    // removes employee by given ID
    removeEmployee(empId) {
        for (let i = 0; i < this.employees.length; i++){
            let emp = this.employees[i];
            if(emp.id == empId){
                this.employees.splice(i, 1);
            }
        }
    }

    // prints all employees
    getAllEmployees() {
        for (let emp of this.employees){
            console.log("ID: " + emp.id + ", Name: " + emp.firstName + " " + emp.lastName + ", Phone: " + emp.phone + ", Email: " + emp.email);
        }
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
            if(book.content.indexOf(text) != -1){
                console.log("Title: " + book.title + "\nContent: '" + book.content + "'");
            }
        }
    };

}




