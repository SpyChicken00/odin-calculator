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
    operatorButtons.map(button => button.style.outline = "none")
}


function updateNum(e) {
    removeHighlight()

    currNumberP.innerText += e.target.textContent
    //update calculator value
    if (operator === "") {
        firstNum = parseFloat(currNumberP.innerText)
    } else {
        secondNum = parseFloat(currNumberP.innerText)
    }
}


function updateOperator(e) {
    removeHighlight()

    operator = e.target.textContent
    e.target.style.outline = "solid 3px white"
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
    operator = "";
    currNumberP.innerText = "";
    prevResultP.innerText = "";
    removeHighlight();
}

function negate(e) {
    //check that number exists
    if (currNumberP.textContent === "") return;
    const negatedNum = parseFloat(currNumberP.textContent) * -1;
    currNumberP.textContent = `${negatedNum}`;
    if (operator === "") {
        firstNum = negatedNum;
    } else {
        secondNum = negatedNum;
    }
}

let firstNum = 0;
let operator = ""
let secondNum = 0;
let currentResult = 0;

//Display Paragraph Elements
const currNumberP = document.querySelector("#currentNumber")
const prevResultP = document.querySelector("#prevTotal")

//Calculator Buttons
//Special Buttons -> Clear, Equals, (Backspace, Paranthesis, Negate, Decimal)
const clearButton = document.querySelector("#clear")
const equalsButton = document.querySelector("#equals")
const negateButton = document.querySelector("#negate")

const operatorButtons = Array.from(document.querySelectorAll("#operator"))
const numButtons = Array.from(document.querySelectorAll("#num-button"))

//Event Listeners
clearButton.addEventListener("click", clearCalc)
equalsButton.addEventListener("click", equalsCalc)
negateButton.addEventListener("click", negate)


operatorButtons.map((button) => {
    button.addEventListener("click", updateOperator)
})
numButtons.map((button) => {
    button.addEventListener("click", updateNum)
})

