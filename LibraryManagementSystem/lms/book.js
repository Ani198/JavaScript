let counter = makeCounter();

class Book{
    constructor(){
        this.id = counter();
        this.title = capitalize(randomWord());
        this.author = authors[getRndInteger(0, authors.length - 1)];
        this.pageCount = getRndInteger(2, 500);
        this.description = randomText();
    }
}

function makeCounter() {
    let count = 1;

    return function() {
        return count++; // has access to the outer "count"
    };
}

let authors = [ "William Shakespeare", "Emily Dickinson", "H. P. Lovecraft", "Arthur Conan Doyle",
    "Leo Tolstoy", "Edgar Allan Poe", "Robert Ervin Howard", "Rabindranath Tagore", "Rudyard Kipling",
    "Seneca", "John Donne", "Sarah Williams", "Oscar Wilde", "Catullus", "Alfred Tennyson", "William Blake",
    "Charles Dickens", "John Keats", "Theodor Herzl", "Percy Bysshe Shelley", "Ernest Hemingway", "Anton Chekhov",
    "Henry Wadsworth", "Longfellow", "Arthur Schopenhauer", "Jacob De Haas", "George Gordon Byron", "Jack London",
    "Robert Frost", "O. Henry", "Ovid", "Robert Louis Stevenson", "John Masefield", "James Joyce", "Clark Ashton Smith",
    "Aristotle", "William Wordsworth", "Jane Austen", "Niccolò Machiavelli"];

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

function randomText() {
    let text = "";
    let numberOfWords = getRndInteger(5, 20);
    for(let i = 0; i < numberOfWords; i++){
        let comma = Math.random() < 0.1 ? ",": "";
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
