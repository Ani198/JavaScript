"use strict"
let expression = prompt("Enter expression");
//console.log(expression);
let numbers = new Array();
let operators = new Array();
let tokenIndex = 0;

while(tokenIndex < expression.length){
    let currentToken = expression[tokenIndex];
    //number
    if(currentToken >= '0' && currentToken <= '9'){
        let num = 0;
        while (tokenIndex < expression.length && currentToken >= '0' && currentToken <= '9'){
            num = num * 10 + Number(currentToken);
            tokenIndex++;
            currentToken = expression[tokenIndex];
        }
        numbers.push(num);
    }
    // '('
    else if(currentToken == '('){
        operators.push(currentToken);
        tokenIndex++;
    }
    // ')'
    else if(currentToken == ')'){
        //alert(numbers);
        //alert(operators);
        while(tokenIndex < expression.length && operators[operators.length - 1] != '('){
            let op = operators.pop();
            let var2 = Number(numbers.pop());
            let var1 = Number(numbers.pop());
            numbers.push(doCalculation(op, var1, var2));
        }
        operators.pop();
        tokenIndex++;
    }
    // operator +, -, *, /
    else {
        while(operators.length != 0 && checkPrecendence(operators[operators.length - 1] >= checkPrecendence(currentToken))){
            let op = operators.pop();
            let var2 = Number(numbers.pop());
            let var1 = Number(numbers.pop());
            numbers.push(doCalculation(op, var1, var2));
        }
        operators.push(currentToken);
        tokenIndex++;
    }
}

while (operators.length != 0){
    let op = operators.pop();
    let var2 = Number(numbers.pop());
    let var1 = Number(numbers.pop());
    numbers.push(doCalculation(op, var1, var2));
}

alert(numbers[numbers.length - 1]);