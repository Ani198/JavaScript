"use strict"

let lib = new Library();

for(let i = 0; i < 8; i++){
    lib.addEmployee(new Employee(i+1));
}

for(let i = 0; i < 20; i++){
    lib.registerBook(new Book(i+1));
}

console.log("Employees\n------------");
lib.getAllEmployees();
console.log('\n');
console.log("Removing 4...");
lib.removeEmployee(4);
console.log("Employees after removing 4\n------------");
lib.getAllEmployees();
console.log('\n');

console.log("Books\n------------");
lib.getAllBooks();
console.log('\n');
console.log("Authors\n------------");
lib.getAllAuthors();
console.log('\n');

// Authors and their books
console.log("Authors and their books\n--------------------");
let mapAB = lib.getAllAuthorsWithBooks();
for(let k of mapAB.keys()){
    lib.getBooksOfAuthor(k);
}

// Author report
console.log("\nAuthors reports\n--------------------");
let mapAR = lib.authorReport();
for(let k of mapAR.keys()){
    console.log(k + ": " + mapAR.get(k));
}
console.log("\n\n");

console.log("Taking 2...");
lib.takeBook(2);
console.log("Taking 3...");
lib.takeBook(3);
console.log("Taking 2...");
lib.takeBook(2);
console.log("Taking 30...");
lib.takeBook(30);
console.log("Returning 2...");
lib.returnBook(2);
console.log("Taking 2...");
lib.takeBook(2);

console.log("\nAll Taken Books:\n-------------");
lib.getAllTakenBooks();



