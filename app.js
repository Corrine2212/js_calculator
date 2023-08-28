// create variables for elements that will change

// need event handler for clicking the buttons

// need function to handle the maths 

// need function to handle the screen updating

const screen = document.querySelector('.calculator__screen');
let buffer = '0';
let runningTotal = 0;
let previousOperator;

function buttonClick(value) {
    console.log(value);
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(number) {
    console.log("number");
    if (buffer === "0") {
        buffer = number;
    } else {
        buffer += number;
        console.log(buffer);
    }
}

function handleMath(value) {
    if (buffer === "0") {
        // do nothing
        return;
    }
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = "0";
    console.log(runningTotal);
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer
    }
}

function handleSymbol(symbol) {
    // console.log("symbol");

    // if (symbol === "C")

    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            // need to clear the running total
            break;
        case '=':
            // console.log('equals');
            if (previousOperator === null) {
                // need 2 numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            // console.log('back arrow');
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '÷':
        case '×':
            // console.log('maths symbol');
            handleMath(symbol)
            break;
    }
}

function init() {
    document.querySelector(".calc-buttons")
        .addEventListener("click", function (event) {
            buttonClick(event.target.innerText);
        });
}

function rerender() {
    screen.innerText = buffer;
}

init()