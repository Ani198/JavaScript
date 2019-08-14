class User {
    constructor(username, firstName, lastName, phone, email, role) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.role = role;
        this.bookHistory = new Set();
    }
}

