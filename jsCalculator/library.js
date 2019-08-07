"use strict"
function doCalculation(operator, op1, op2) {
    switch (operator) {
        case '+':
            return op1 + op2;
            break;
        case '-':
            return op1 - op2;
            break;
        case '*':
            return op1 * op2;
            break;
        case '/':
            return op1 / op2;
            break;
    }
}

function checkPrecendence(op1, op2) {
    //true, if op1 has higher precendence than op2, or they have equal precendences
    //false, in other case
    if((op1 == '+' || op1 == '-') && (op2 == '+' || op2 == '-'))
        return true;
    else if((op1 == '*' || op1 == '/') && (op2 == '*' || op2 == '/'))
        return true;
    else if((op1 == '*' || op1 == '/') && (op2 == '+' || op2 == '-'))
        return true;
    else if((op1 == '+' || op1 == '-') && !(op2 == '*' || op2 == '/'))
        return true;
    else
        return false;
}
