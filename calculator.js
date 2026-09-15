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
    if (currNumberP.textContent.length > 20) return;
    
    //remove extra zero at start of numbers
    if (currNumberP.textContent === '0') currNumberP.textContent = ""
    // if (currNumberP.textContent === '-0') currNumberP.textContent = "-"
    
    //update display
    if (operatorPressed) {
        if (currNumberP.textContent === "-0") {
            currNumberP.textContent = `${parseFloat(numText) * -1}`
        } else{
            currNumberP.textContent = numText
        }
        
        operatorPressed = false;
    } else {
        if (currNumberP.textContent === "-0") {
            currNumberP.textContent = `${parseFloat(numText) * -1}`
        } else{
            currNumberP.textContent += numText
        }
    }
    
    //update calc internal variables based on display
    if (operator === "") {
        firstNum = parseFloat(currNumberP.textContent)
    } else {
        secondNum = parseFloat(currNumberP.textContent)
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
        currNumberP.textContent = currentResult
    } else if (currentResult % 1 != 0) {//if float
        currNumberP.textContent = parseFloat(currentResult.toFixed(10))
        prevResultP.textContent = parseFloat(currentResult.toFixed(10))
    } else {
        currNumberP.textContent = currentResult
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
    currNumberP.textContent = "0";
    prevResultP.textContent = "";
    operatorPressed = false;
    displayingResult = false;
    isNegated = false;
    removeHighlight();
}


function negate() {
    isNegated = !isNegated
    //check that number exists
    if (currNumberP.textContent === "") return;
    const negatedNum = parseFloat(currNumberP.textContent) * -1;
    
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
    currNumberP.textContent = (currNumberP.textContent === "0")? `-${negatedNum}` : `${negatedNum}`;
    if (operatorPressed) currNumberP.textContent = "-0"
    
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
    // currNumberP.textContent = e.key
    //check if valid key, if so send to updateNum function? 
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
            break;
        case "(":
        case ")":
            break;
        case ".":
            break;
        case "m":
            //negate()
            break;
        case "c":
            clearCalc();
            break;
            //press equals button
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
const currNumberP = document.querySelector("#currentNumber")
const prevResultP = document.querySelector("#prevTotal")

//Calculator Buttons
//Special Buttons -> Clear, Equals, (Backspace, Paranthesis, Negate, Decimal)
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

