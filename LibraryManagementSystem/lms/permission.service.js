"use strict"
function getRoles()
{
    return {
        'student': {
            'issueBook': true,
            'renewBook': true,
            'returnBook': true,
            'viewHistory': true,
            'recommendBook': false,
            'searchBook': true,
            'addBook': false,
            'addUser': false,
            'editUser': false,
            'removeUser': false,
            'acceptHold': false,
            'acceptRenew': false,
            'acceptReturn': false
        },
        'faculty': {
            'issueBook': true,
            'renewBook': true,
            'viewHistory': true,
            'recommendBook': true,
            'searchBook': true,
            'addBook': false,
            'addUser': false,
            'editUser': false,
            'removeUser': false,
            'acceptHold': false,
            'acceptRenew': false,
            'acceptReturn': false
        },
        'employee': {
            'issueBook': false,
            'renewBook': false,
            'returnBook': false,
            'viewHistory': false,
            'recommendBook': false,
            'searchBook': true,
            'addBook': true,
            'addUser': true,
            'editUser': true,
            'removeUser': true,
            'acceptHold': true,
            'acceptRenew': true,
            'acceptReturn': true
        }
    };
}



