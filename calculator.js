//Simple javascript calculator
// 9-14-26
//BUGS: Negate button doesnt always negate result?;
// // only negates existing numbers so you have to press number then -/+
//Future Features - Keyboard support, memes instead of parenthesis, fi negate

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
    if (displayingResult) clearCalc()
    removeHighlight()
    if (currNumberP.textContent.length > 20) return;
    

    //remove extra zero at start of numbers
    if (currNumberP.innerText === '0') currNumberP.innerText = ""

    //update display
    if (operatorPressed) {
        currNumberP.innerText = e.target.textContent
        operatorPressed = false;
    } else {
        currNumberP.innerText += e.target.textContent
    }
    
    //update calc internal variables based on display
    if (operator === "") {
        firstNum = parseFloat(currNumberP.innerText)
    } else {
        secondNum = parseFloat(currNumberP.innerText)
    }
}


function updateOperator(e) {
    if(firstNum === null) return;
    if(displayingResult) displayingResult = false;
    removeHighlight()

    operator = e.target.textContent
    e.target.style.outline = "solid 3px white"
    operatorPressed = true;
}

function equalsCalc() {
    if (operator == "") return;

    currentResult = operate(firstNum, operator, secondNum)
    
    if (currentResult === "Impossible Silly Goose!") {//if divide by 0
        currentResult = 0;
        operator = ""
        prevResultP.innerText = "Impossible Silly Goose!"
        currNumberP.innerText = currentResult
    } else if (currentResult % 1 != 0) {//if float
        currNumberP.innerText = parseFloat(currentResult.toFixed(10))
        prevResultP.innerText = parseFloat(currentResult.toFixed(10))
    } else {
        currNumberP.innerText = currentResult
        prevResultP.innerText = currentResult
    }
    firstNum = currentResult
    secondNum = 0
    displayingResult = true;
}

function clearCalc() {
    firstNum = null;
    secondNum = null;
    currentResult = null;
    operator = "";
    currNumberP.innerText = "0";
    prevResultP.innerText = "";
    operatorPressed = false;
    displayingResult = false;
    isNegated = false;
    removeHighlight();
}

//BUGGED / NOT IDEAL, first second num logic annoying
function negate() {
    isNegated = !isNegated
    //check that number exists
    if (currNumberP.textContent === "") return;
    const negatedNum = parseFloat(currNumberP.textContent) * -1;
    currNumberP.textContent = (currNumberP.textContent === "0")? `-${negatedNum}` : `${negatedNum}`;
    if (operator === "") {
        firstNum = negatedNum;
    } else {
        secondNum = negatedNum;
    }
    if (displayingResult) {
        const temp = parseFloat(currNumberP.textContent)
        clearCalc()
        firstNum = negatedNum
        currNumberP.textContent = temp
    }
}


function decimal() {
    if (currNumberP.textContent.includes(".")) return;
    if (displayingResult){
        const temp = parseFloat(currNumberP.textContent)
        clearCalc()
        firstNum = temp
        currNumberP.textContent = temp
    } 
    currNumberP.textContent += "."
}

function deleteCharacter(){
    const length = currNumberP.textContent.length
    if (currNumberP.textContent === "0") return
    if(length === 1) {
        currNumberP.textContent = "0"
        return;
    }

    //cut off last character
    currNumberP.textContent = currNumberP.textContent.substring(0, length - 1)
    if(displayingResult) {
        const temp = parseFloat(currNumberP.textContent)
        clearCalc()
        firstNum = temp
        currNumberP.textContent = temp
    } else {
        firstNum = parseFloat(currNumberP.textContent)
    }
}

let firstNum = null;
let secondNum = null;
let currentResult = null;
let operator = ""
let operatorPressed = false;
let displayingResult = false;
let isNegated = false;

//Display Paragraph Elements
const currNumberP = document.querySelector("#currentNumber")
const prevResultP = document.querySelector("#prevTotal")

//Calculator Buttons
//Special Buttons -> Clear, Equals, (Backspace, Paranthesis, Negate, Decimal)
const clearButton = document.querySelector("#clear")
const equalsButton = document.querySelector("#equals")
const negateButton = document.querySelector("#negate")
const decimalButton = document.querySelector("#decimal")
const backButton = document.querySelector("#back")

const operatorButtons = Array.from(document.querySelectorAll("#operator"))
const numButtons = Array.from(document.querySelectorAll("#num-button"))

//Event Listeners
clearButton.addEventListener("click", clearCalc)
equalsButton.addEventListener("click", equalsCalc)
negateButton.addEventListener("click", negate)
decimalButton.addEventListener("click", decimal)
backButton.addEventListener("click", deleteCharacter)

operatorButtons.map((button) => {
    button.addEventListener("click", updateOperator)
})
numButtons.map((button) => {
    button.addEventListener("click", updateNum)
})

