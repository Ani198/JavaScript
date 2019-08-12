class LMS {
    constructor(){
        this.umService = new UserManagement();
        this.books = [];
        this.takenBooks = []; //0-not taken, 1-placed, 2-taken
    }

    addBook(bookId, title, author, pageCount, description) {
        if(bookId=="" || title=="" || author=="" || pageCount==""){
            this.books.push(Book.generateRandomBook());
            this.takenBooks.push(0);
        }else{
            this.books.push(new Book(bookId, title, author, pageCount ,description));
            this.takenBooks.push(0);
        }
    }

    addUser(username, firstName, lastName, phone, email, role, password){
        this.umService.users.push(new User(username,firstName,lastName,phone,email,role));
        this.umService.passwords.push(EncryptionHelper.hash(password));
    }

    removeUser(username) {
        for(let i=0;i< this.users.length;i++){
            if(this.users[i].username==username){
                this.users[i].splice(i,1);
            }
        }
    }

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

    acceptHold(bookId, username){
        for(let i=0;i<this.books.length;i++){
            if(this.books[i].bookId==bookId){
                this.takenBooks[i]=username;
            }
        }
    }

    acceptReturn(bookId){
        for(let i=0;i<this.books.length;i++){
            if(this.books[i].bookId==bookId){
                this.takenBooks[i]=0;
            }
        }
    }

    issueBook(bookId){
        for(let i=0;i<this.books.length;i++){
            if(this.books[i].bookId==bookId){
                this.takenBooks[i] = 1;
            }
        }
    }

    viewHistory(){

    }

    getUmService(){
        return this.umService;
    }
}