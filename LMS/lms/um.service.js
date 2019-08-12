class UserManagement {
    constructor(){
        this.users = [];
        this.passwords = [];
        
        this.users.push(new User('admin','admin','','','','employee'));
        this.passwords.push('admin12');
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