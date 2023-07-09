function add(a, b) {
    return Math.round((parseFloat(a) + parseFloat(b))*1000000)/1000000;
}

function subtract(a, b) {
    return Math.round((parseFloat(a) - parseFloat(b))*1000000)/1000000;
}

function multiply(a, b) {
    return Math.round((parseFloat(a) * parseFloat(b))*1000000)/1000000;
}

function divide(a, b) {
    return Math.round((parseFloat(a) / parseFloat(b))*1000000)/1000000; 
}

let number1;
let operator;
let number2;
let result;

function operate() {
    if (number1 == null || number2 == null) {
        return;
    }
    if (number2 == "0" && operator == "/") {
        display.textContent = "Error: Dividing by 0";
        return;
    }
    if (operator == "+") {
        result = display.textContent = add(number1, number2).toString();
    } else if (operator == "-") {
        result = display.textContent = subtract(number1, number2).toString();
    } else if (operator == "*") {
        result = display.textContent = multiply(number1, number2).toString();
    } else if (operator == "/") {
        result = display.textContent = divide(number1, number2).toString();
    } 
    if (result != null && result.toString().length >= 11) {
        display.textContent = "Error: max number reached";
        return;
    }
    operator = null;
    number2 = null;
    number1 = result;
}

let display = document.querySelector("#display");

let numbers = document.querySelectorAll(".number");

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", doANumber);
}

let operators = document.querySelectorAll(".operator");

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", doAOperation);
}

let equals = document.querySelector("#equals");
equals.addEventListener("click", operate);

let comma = document.querySelector("#comma");
comma.addEventListener("click", doAComma);


let sign = document.querySelector("#sign");
sign.addEventListener("click", function() {
    if (display.textContent == "0" || display.textContent == null) { 
        return;
    }
    if (number1 != null && number2 == "0") {
        return;
    }
    if (number1 != null && operator == null && number1.includes("-") == false) {
        number1 = "-" + number1;
        display.textContent = number1;
    } else if (number1 != null && operator == null && number1.includes("-")) {
        number1 = number1.replace("-", "");
        display.textContent = number1;
    } else if (result != null || operator != null && number2.includes("-") == false) {
        number2 = "-" + number2;
        display.textContent = number2;
    } else if (result != null || operator != null && number2.includes("-")) {
        number2 = number2.replace("-", "");
        display.textContent = number2;
    }
});

let clear = document.querySelector("#clear");
clear.addEventListener("click", function() {
    if (display.textContent == "") { //display.textContent is never null
    } else {
        display.textContent = 0;
    }
    number1 = null;
    operator = null;
    number2 = null;
    result = null;
});

let backspace = document.querySelector("#backspace");
backspace.addEventListener("click", function() {
    if (display.textContent == null || display.textContent == result) {
        return;
    }
    if (display.textContent == number1) {
        if (number1.length == 1) {
            number1 = "0";
            display.textContent = number1;
        } else {
            let length = number1.length - 1;
            number1 = number1.slice(0, length);
            display.textContent = number1;
        }
    } else if (display.textContent == number2) {
        if (number2.length == 1) {
            number2 = "0";
            display.textContent = "0";
        } else {
            let length = number2.length - 1;
            number2 = number2.slice(0, length);
            display.textContent = number2;
        }
    }
})

let power = document.querySelector("#power");

power.addEventListener("click", function() {
    if (display.textContent != "") { 
        display.textContent = null;
        display.style.backgroundColor = "silver";
        number1 = null;
        operator = null;
        number2 = null;
        result = null;
        for (let number of numbers) {
            number.removeEventListener("click", doANumber);
        }
        for (let operator of operators) {
            operator.removeEventListener("click", doAOperation);
        }
        comma.removeEventListener("click", doAComma);
    } else if (display.textContent == "") {
        display.textContent = "0";
        display.style.backgroundColor = "rgb(128, 212, 128)";
        for (let number of numbers) {
            number.addEventListener("click", doANumber);
        }
        for (let operator of operators) {
            operator.addEventListener("click", doAOperation);
        }
        comma.addEventListener("click", doAComma);
    }
})

function doANumber() { // need a .toString().length ?
    if (result != null && operator == null) {
        return;
    }
    if (number1 != null && number1.toString().length >= 9 && operator == null) {
        return;
    }
    if (number2 != null && number2.toString().length >= 9) {
        return;
    }
    if (operator == null && result == null) {
        if (number1 == null) {
            number1 = this.textContent;
            display.textContent = this.textContent;
        } else {
            number1 += this.textContent
            display.textContent += this.textContent;
        }
    } else {
        if (result != null || operator != null) {
            if (number2 == "0") {
                number2 = this.textContent
                display.textContent = this.textContent;
                return;
            }
            if (number2 == null) {
                number2 = this.textContent
                display.textContent = this.textContent;
            } else {
                number2 += this.textContent
                display.textContent += this.textContent;
            }
        }
    }
}

function doAOperation() {
    if (number2 != null && operator != null) {
        return;
    }
    if (number1 == null) {
        number1 = "0";
    }
    operator = this.textContent; 
}

function doAComma() {
    if (display.textContent.includes(".")) {
    return;
    }
    if (operator == null && result == null) {
        if (number1 == null) {
            number1 = "0" + comma.textContent;
            display.textContent = "0" + comma.textContent;
        } else {
            number1 += comma.textContent
            display.textContent += comma.textContent;
        }
    } else {
        if (result != null || operator != null) {
            if (number2 == null) {
                number2 = "0" + comma.textContent
                display.textContent = "0" + comma.textContent;
            } else {
                number2 += comma.textContent
                display.textContent += comma.textContent;
            }
        }
    }
}   

// limit number of decimals in numbers sort of ok (not accounting for - or .)
// need more optimalization ok?
// keyboard support? maybe not - ie some laptops only have operators by fn + key, might run into problems