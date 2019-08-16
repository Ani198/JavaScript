class UserManagement {
    constructor(){
        this.users = [];
        this.passwords = [];

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