class AuthService {
    static login(username, password, role){
        let user = window.lms.getUmService().getUserByUsername(username);
        if(user==null){
            console.log('Username or password is incorrect');
            return;
        } 

        let hashedPass = EncryptionHelper.hash(password);
        if(user.password === hashedPass){
            if(sessionStorage.getItem('authInfo')!=null) sessionStorage.removeItem('authInfo');
            sessionStorage.setItem('authInfo', JSON.stringify(user));
            switch (role) {
                case "student":
                    window.location.replace("../student/student.html");
                    break;
                case 'faculty':
                    window.location.replace("../faculty/faculty.html");
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