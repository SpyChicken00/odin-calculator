//Simple javascript calculator
// 9-14-26
//Refactor Code with currentNumber tracker and update display/var functions, turned into spaghetti
//Future Features - Keyboard support

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

function addHighlight(operatorText) {
    let button = (operatorButtons.filter((button) => {return button.textContent === operatorText}))[0]
    button.style.outline = "solid 3px white" 
}

function updateNum(numText) {
    if (displayingResult) clearCalc()
    removeHighlight()
    if (displayNumP.textContent.length > 20) return;
    
    //remove extra zero at start of numbers
    if (displayNumP.textContent === '0') displayNumP.textContent = ""
    // if (displayNumP.textContent === '-0') displayNumP.textContent = "-"
    
    //update display
    if (operatorPressed) {
        if (displayNumP.textContent === "-0") {
            displayNumP.textContent = `${parseFloat(numText) * -1}`
        } else{
            displayNumP.textContent = numText
        }
        
        operatorPressed = false;
    } else {
        if (displayNumP.textContent === "-0") {
            displayNumP.textContent = `${parseFloat(numText) * -1}`
        } else{
            displayNumP.textContent += numText
        }
    }
    
    //update calc internal variables based on display
    if (operator === "") {
        firstNum = parseFloat(displayNumP.textContent)
    } else {
        secondNum = parseFloat(displayNumP.textContent)
    }
}

function updateOperator(operatorText) {
    if(firstNum === null) return;
    if(displayingResult) displayingResult = false;
    removeHighlight()

    operator = operatorText
    addHighlight(operatorText)
    operatorPressed = true;
}

function equalsCalc() {
    if (operator == "") return;

    currentResult = operate(firstNum, operator, secondNum)
    
    if (currentResult === "Impossible Silly Goose!") {//if divide by 0
        currentResult = 0;
        operator = ""
        prevResultP.textContent = "Impossible Silly Goose!"
        displayNumP.textContent = currentResult
    } else if (currentResult % 1 != 0) {//if float
        displayNumP.textContent = parseFloat(currentResult.toFixed(10))
        prevResultP.textContent = parseFloat(currentResult.toFixed(10))
    } else {
        displayNumP.textContent = currentResult
        prevResultP.textContent = currentResult
    }
    firstNum = currentResult
    secondNum = null
    displayingResult = true;
}

function clearCalc() {
    firstNum = null;
    secondNum = null;
    currentResult = null;
    operator = "";
    displayNumP.textContent = "0";
    prevResultP.textContent = "";
    operatorPressed = false;
    displayingResult = false;
    isNegated = false;
    removeHighlight();
}


function negate() {
    isNegated = !isNegated
    //check that number exists
    if (displayNumP.textContent === "") return;
    const negatedNum = parseFloat(displayNumP.textContent) * -1;
    
    if (operator === "") {
        firstNum = negatedNum;
    } else {
        secondNum = negatedNum;
    }
    if (displayingResult) {
        const temp = parseFloat(displayNumP.textContent)
        clearCalc()
        firstNum = negatedNum
        displayNumP.textContent = temp
    }
    displayNumP.textContent = (displayNumP.textContent === "0")? `-${negatedNum}` : `${negatedNum}`;
    if (operatorPressed) displayNumP.textContent = "-0"
    
}


function decimal() {
    if (displayNumP.textContent.includes(".")) return;
    if (displayingResult){
        const temp = parseFloat(displayNumP.textContent)
        clearCalc()
        firstNum = temp
        displayNumP.textContent = temp
    } 
    displayNumP.textContent += "."
}

function deleteCharacter(){
    const length = displayNumP.textContent.length
    if (displayNumP.textContent === "0") return
    if(length === 1) {
        displayNumP.textContent = "0"
        return;
    }

    //cut off last character
    displayNumP.textContent = displayNumP.textContent.substring(0, length - 1)
    if(displayingResult) {
        const temp = parseFloat(displayNumP.textContent)
        clearCalc()
        firstNum = temp
        displayNumP.textContent = temp
    } else {
        firstNum = parseFloat(displayNumP.textContent)
    }
}

function showMeme() {
    if (!memeToggle) {
        let img = document.createElement("img")
        let span = document.createElement("span")
        let p = document.createElement("p")
        let link = document.createElement("a")
        link.setAttribute("href", "https://spychicken00.github.io/odin-etch-a-sketch/")
        link.textContent = "Forget this, lets draw something instead!"
        img.setAttribute('src',"./images/math.jpg")
        img.setAttribute("height", "300")
        img.setAttribute('alt', "confused woman looking at math")
        span.setAttribute('id', "meme")
        span.setAttribute("style", 'margin:30px')
        p.append(link)
        span.appendChild(img)
        span.appendChild(p)
        document.querySelector("body").appendChild(span)
    }
    else {
        document.querySelector("#meme").remove()
    }
    memeToggle = !memeToggle
}

function keyboardControls(e){
    switch(e.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            updateNum(e.key)
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            updateOperator(e.key)
            break;
        case "Enter":
            equalsCalc()
            break;
        case "Backspace":
            deleteCharacter()
            break;
        case "(":
        case ")":
            showMeme()
            break;
        case ".":
            decimal()
            break;
        case "n":
            negate()
            break;
        case "c":
            clearCalc();
            break;
    }
}

let firstNum = null;
let secondNum = null;
let currentResult = null;
let operator = ""
let operatorPressed = false;
let displayingResult = false;
let isNegated = false;
let memeToggle = false;

//Display Paragraph Elements
const displayNumP = document.querySelector("#currentNumber")
const prevResultP = document.querySelector("#prevTotal")

//Calculator Buttons
const clearButton = document.querySelector("#clear")
const equalsButton = document.querySelector("#equals")
const negateButton = document.querySelector("#negate")
const decimalButton = document.querySelector("#decimal")
const backButton = document.querySelector("#back")
const parenthesisButton = document.querySelector("#parenthesis")

const operatorButtons = Array.from(document.querySelectorAll("#operator"))
const numButtons = Array.from(document.querySelectorAll("#num-button"))

//Event Listeners
clearButton.addEventListener("click", clearCalc)
equalsButton.addEventListener("click", equalsCalc)
negateButton.addEventListener("click", negate)
decimalButton.addEventListener("click", decimal)
backButton.addEventListener("click", deleteCharacter)
parenthesisButton.addEventListener("click", showMeme)

operatorButtons.map((button) => {
    button.addEventListener("click", (e) => {updateOperator(e.target.textContent)})
})
numButtons.map((button) => {
    button.addEventListener("click", (e) => {updateNum(e.target.textContent)})
})

document.addEventListener("keydown", keyboardControls)

