class UserManagement {
    constructor(){
        this.users = [];
        this.passwords = [];
        
        this.users.push(new User('admin','admin','','','','admin'));
        this.passwords.push('admin12');
        this.users.push(new User('student','student','','','','student'));
        this.passwords.push('student12');
        this.users.push(new User('faculty','faculty','','','','faculty'));
        this.passwords.push('faculty12');
    }

    getUserByUsername(username){
        for(let i=0;i<this.users.length;i++){
            if(this.users[i].username==username){
                return {
                    username: username,
                    role: this.users[i].role,
                    password: this.passwords[i]
                };
            }
        }
        return null;
    }
}