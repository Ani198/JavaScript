
function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let role = document.getElementById('role').value;
    AuthService.login(username,password, role);

}

function logout() {
    AuthService.logout();
}