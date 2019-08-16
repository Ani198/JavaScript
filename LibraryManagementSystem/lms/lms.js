class LMS {
    constructor(){
        this.umService = new UserManagement();
        this.books = [];
        this.takenBooks = []; //0-not taken, 1-placed, 2-taken
    }
    getUmService(){
        return this.umService;
    }
/*
    searchBook(title,author,description){
        if(author==""){
            for(let i=0; i<this.books.length;i++){
                if(this.books[i].title==title){
                    if(this.takenBooks[i]==0){
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\n`);
                    }else if(this.takenBooks[i]==1){
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\nBook Placed on Hold\n`);
                    }else{
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\nBook taken by ${this.takenBooks[i]}\n`);
                    }
                    return;
                }
            }
            console.log(`Books with such parameters not found!`);
        }else if(description==""){
            for(let i=0; i<this.books.length;i++){
                if(this.books[i].title==title && this.books[i].author==author){
                    if(this.takenBooks[i]==0){
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\n`);
                    }else if(this.takenBooks[i]==1){
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\nBook Placed on Hold\n`);
                    }else{
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\nBook taken by ${this.takenBooks[i]}\n`);
                    }
                    return;
                }
            }
            console.log(`Books with such parameters not found!`);
        }else{
            for(let i=0; i<this.books.length;i++){
                if(this.books[i].title==title && this.books[i].author==author && this.books[i].description.includes(description)){
                    if(this.takenBooks[i]==0){
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\n`);
                    }else if(this.takenBooks[i]==1){
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\nBook Placed on Hold\n`);
                    }else{
                        console.log(`Book ID: ${this.books[i].bookId}\nTitle: ${this.books[i].title}\n
                        Author: ${this.books[i].author}\nDescription: ${this.books[i].description}\n
                        Page Count: ${this.books[i].pageCount}\nBook taken by ${this.takenBooks[i]}\n`);
                    }
                    return;
                }
            }
            console.log(`Books with such parameters not found!`);
        }
        
    }
*/


}