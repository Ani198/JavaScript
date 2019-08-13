class AuthService {
    static login(username, password){
        let user = window.lms.getUmService().getUserByUsername(username);
        if(user==null){
            console.log('Username or password is incorrect');
            return;
        } 

        let hashedPass = EncryptionHelper.hash(password);
        if(user.password === hashedPass){
            if(sessionStorage.getItem('authInfo')!=null) sessionStorage.removeItem('authInfo');
            sessionStorage.setItem('authInfo', JSON.stringify(user));
            switch (user.role) {
                case "student":
                case 'faculty':
                    window.location.replace("../user/user.html");
                    break;
                case 'admin':
                    window.location.replace("../admin/admin.html");
                    break;
            }
        }else{
            console.log('Username or password is incorrect');
        }
    }

    static logout(){
        sessionStorage.removeItem('authInfo');
        window.location.replace('../login/login.html')
    }


}