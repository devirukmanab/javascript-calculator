let prevNumber = ''
let calculationOperator = ''
let secondOperator = ''
let currentNumber = '0'
let tempNumber = ''

const numbers = document.querySelectorAll(".number")

const inputNumber = (number) => {
    if (currentNumber === '0') {
        currentNumber = number
    } else if (flagNumber == true) {
        currentNumber += number
    } else if (flagNumber == false) {
        currentNumber = number
    }
    flagOperator = true
    // After input number, operator ready to use
    checkOperator = false
    // Only false after calculation, to avoid add number straight to calculation result
    flagNumber = true
}

numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        inputNumber(event.target.value)
        updateScreen(currentNumber)
    })
})


const calculatorScreen = document.querySelector(".calculator-screen")

const updateScreen = (number) => {
    calculatorScreen.value = number
}


const operators = document.querySelectorAll(".operator")

const inputOperator = (operator) => {
    if (calculationOperator === '') {
        prevNumber = currentNumber
        flagOperator = false
        tempNumber = currentNumber
    } else if (flagOperator == true) {
        calculate()
        updateScreen(currentNumber)
        prevNumber = currentNumber
        calculationOperator = secondOperator
    }
    calculationOperator = operator
    currentNumber = '0'
    flagCalculate = false
    checkOperator = true
}

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value)
    })
})

const equalSign = document.querySelector('.equal-sign')

const calculate = () => {
    if (flagCalculate == false) {
        let result = ''
        switch(calculationOperator) {
            case "+":
                result = parseFloat(prevNumber) + parseFloat(currentNumber)
                break
            case "-":
                result = parseFloat(prevNumber) - parseFloat(currentNumber)
                break
            case "*":
                result = parseFloat(prevNumber) * parseFloat(currentNumber)
                break
            case "/":
                result = parseFloat(prevNumber) / parseFloat(currentNumber)
                break
            default:
                break
        }
    tempNumber = currentNumber
    currentNumber = result
    secondOperator = calculationOperator
    calculationOperator = ''
    flagCalculate = true
    checkOperator = true
    } else if (flagCalculate == true && checkOperator == true) {
        result = currentNumber
        switch(secondOperator) {
            case "+":
                result = result + parseFloat(tempNumber)
                break
            case "-":
                result = result - parseFloat(tempNumber)
                break
            case "*":
                result = result * parseFloat(tempNumber)
                break
            case "/":
                result = result / parseFloat(tempNumber)
                break
            default:
                break
        }       
    currentNumber = result
    } else {
        currentNumber = '0'
    }
    flagOperator = false
    flagNumber = false
}

equalSign.addEventListener("click", () => {
    calculate()
    updateScreen(currentNumber)
})


const clearBtn = document.querySelector('.all-clear')

const clearAll = (clearBtn) => {
    prevNumber = ''
    calculationOperator = ''
    currentNumber = '0'
    flagCalculate = false
}

clearBtn.addEventListener("click", () => {
    clearAll()
    updateScreen(currentNumber)
})

const decimal = document.querySelector('.decimal')

inputDecimal = (dot) => {
    if (currentNumber.includes('.')) {
        return
    }
    currentNumber += dot
}

decimal.addEventListener("click", () => {
    inputDecimal(event.target.value)
    updateScreen(currentNumber)
})

const percentage = document.querySelector('.percentage')

const calcPercentage = (percentage) => {
    currentNumber = currentNumber / 100
}

percentage.addEventListener("click", () => {
    calcPercentage()
    updateScreen(currentNumber)
})
