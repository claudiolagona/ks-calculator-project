class Calculator {
    constructor(previousNumberTextElement, currentNumberTextElement) {
        this.previousNumberTextElement = previousNumberTextElement;
        this.currentNumberTextElement = currentNumberTextElement;
        this.clear();
    }

    clear() {
        this.currentNumber = '';
        this.previousNumber = '';
        this.operation = undefined;
    }

    delete() {
        this.currentNumber = this.currentNumber.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentNumber.includes('.')) return;
        this.currentNumber = this.currentNumber.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentNumber === '') return;
        if (this.previousNumber !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousNumber = this.currentNumber;
        this.currentNumber = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousNumber);
        const current = parseFloat(this.currentNumber);
        if(isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    this.zeroError();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentNumber = computation;
        this.operation = undefined;
        this.previousNumber = '';
    }

    zeroError() {
        this.clear();
        alert('Cannot divide by zero');
    }

    changeCharge() {
        let stringNumber = this.currentNumber.toString();
        if(stringNumber !== '' && stringNumber !== '0') {
            if(stringNumber.startsWith('-')) {
                this.currentNumber = parseFloat(stringNumber.slice(1));
            } else {
                stringNumber = `-${stringNumber}`;
                this.currentNumber = parseFloat(stringNumber);
            }
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentNumberTextElement.innerText = this.getDisplayNumber(this.currentNumber);
        if (this.operation != null) {
            this.previousNumberTextElement.innerText = `${this.getDisplayNumber(this.previousNumber)} ${this.operation}`;
        } else {
            this.previousNumberTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operator');
const equalButton = document.getElementById('equal');
const deleteButton = document.getElementById('delete');
const allClearButton = document.getElementById('all-clear');
const plusMinusButton = document.getElementById('plus-minus');
const previousNumberTextElement = document.getElementById('previous-number-display');
const currentNumberTextElement = document.getElementById('current-number-display');

const calculator = new Calculator(previousNumberTextElement, currentNumberTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

plusMinusButton.addEventListener('click', () => {
    calculator.changeCharge();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

document.addEventListener('keyup', (ev) => {
    let event = parseFloat(ev.key);
    if (event >= 0 || event <= 9) {
        calculator.appendNumber(event);
        calculator.updateDisplay();
    }
    switch (ev.key) {
        case '.':
            calculator.appendNumber(ev.key);
            calculator.updateDisplay();
            break;
        case '/':
            calculator.chooseOperation(ev.key);
            calculator.updateDisplay();
            break;
        case '+':
            calculator.chooseOperation(ev.key);
            calculator.updateDisplay();
            break;
        case '-':
            calculator.chooseOperation(ev.key);
            calculator.updateDisplay();
            break;
        case '*':
            calculator.chooseOperation(ev.key);
            calculator.updateDisplay();
            break;
        case 'Enter':
            calculator.compute();
            calculator.updateDisplay();
            break;
        case 'Backspace':
            calculator.delete();
            calculator.updateDisplay();
            break;
        default:
            return;
    }
})