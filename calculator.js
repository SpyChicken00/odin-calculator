//This is a javascript comment yeah


function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    //need support for floats?
    //dont allow dividing by 0, check here or later?
    if (num2 === 0) return "Impossible Silly Goose!"
    return num1 / num2
}



function operate(num1, operator, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2)
        case "-":
            return subtract(num1, num2)
        case "*":
            return multiply(num1, num2)
        case "/":
           return  divide(num1, num2)
        
    }
}

function removeHighlight() {
    operatorButtons.map(button => button.style.border = "none")
}

//called when the user preses a button
function updateNum(e) {
    removeHighlight()


    currNumberP.innerText += e.target.textContent
    //update calculator value 
    if (operator === "") {
        firstNum = parseInt(currNumberP.innerText)
    } else {
        secondNum = parseInt(currNumberP.innerText)
    }
}

function updateOperator(e) {
    removeHighlight()

    operator = e.target.textContent
    e.target.style.border = "solid 3px white"
    currNumberP.innerText = ""
}

function equalsCalc() {
    currentResult = operate(firstNum, operator, secondNum)
    currNumberP.innerText = currentResult
    prevResultP.innerText = currentResult
    firstNum = currentResult
    secondNum = 0
}

function clearCalc() {
    firstNum = 0;
    secondNum = 0;
    currentResult = 0;
    operator = ""
    currNumberP.innerText = ""
    prevResultP.innerText = "";
    removeHighlight()
}


const currNumberP = document.querySelector("#currentNumber")
const prevResultP = document.querySelector("#prevTotal")

const clearButton = document.querySelector("#clear")

const equalsButton = document.querySelector("#equals")
const plusButton = document.querySelector("#add")
const operatorButtons = [equalsButton, plusButton]

const oneButton = document.querySelector("#one")
const twoButton = document.querySelector("#two")
const threeButton = document.querySelector("#three")
const numButtons = [oneButton, twoButton, threeButton]

clearButton.addEventListener("click", clearCalc)
equalsButton.addEventListener("click", equalsCalc)
plusButton.addEventListener("click", updateOperator)


numButtons.map((button) => {
    button.addEventListener("click", updateNum)
})

let firstNum = 0;
let operator = ""
let secondNum = 0;
let currentResult = 0;
