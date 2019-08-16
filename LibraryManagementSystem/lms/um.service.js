class UserManagement {
    constructor(){
        this.users = [];
        this.passwords = [];

        //console.log("users" in sessionStorage);
/*
        if(JSON.parse(sessionStorage.getItem("users")) === null) {
            this.users.push(new User('admin', capitalize(randomWord()), capitalize(randomWord()),
                randomPhoneNumber(), randomWord() + "@gmail.com", 'admin', new Set()));
            this.passwords.push('admin12');
            this.users.push(new User('student', capitalize(randomWord()), capitalize(randomWord()),
                randomPhoneNumber(), randomWord() + "@gmail.com", 'student', new Set()));
            this.passwords.push('student12');
            this.users.push(new User('faculty', capitalize(randomWord()), capitalize(randomWord()),
                randomPhoneNumber(), randomWord() + "@gmail.com", 'faculty', new Set()));
            this.passwords.push('faculty12');
            sessionStorage.setItem("users", JSON.stringify(this.users));
            sessionStorage.setItem("passwords", JSON.stringify(this.passwords));
        }*/
    }
    getUserByUsername(username){
        let users = JSON.parse(sessionStorage.getItem("users"));
        let passwords = JSON.parse(sessionStorage.getItem("passwords"));

        for(let i=0;i<users.length;i++){
            if(users[i].username==username){
                return {
                    username: username,
                    role: users[i].role,
                    password: passwords[i]
                };
            }
        }
        return null;
    }
}