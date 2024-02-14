let numbersDisplay = document.querySelector('.number-display');
let operatorDisplay = document.querySelector('.operator-display');
let numberButton = document.querySelectorAll('.number');
let operatorButton = document.querySelectorAll('.operator');
let equalButton = document.querySelector('#equal');
let allClearButton = document.querySelector('#all-clear');
let deleteButton = document.querySelector('#delete');
let dotButton = document.querySelector('#dot');
let plusMinusButton = document.querySelector('#plus-minus');

let numberInput = '';
let operatorInput = '';

let displayNumbers = (toDisplay) => {
    numbersDisplay.textContent = toDisplay;
}

let displayOperator = (toDisplay) => {
    operatorDisplay.textContent = toDisplay;
}

let operate = {
    a: null,
    b: null,
    mathOperator: null,
    equal: null,
    afterDecimal: 1000,

    add: () => {
        return Math.round((this.a +this.b) * this.afterDecimal) / this.afterDecimal;
    },
    subtract: () => {
        return Math.round((this.a - this.b) * this.afterDecimal) / this.afterDecimal
    },
    multiply: () => {
        return Math.round((this.a * this.b) * this.afterDecimal) / this.afterDecimal
    },
    divide: () => {
        if (this.b === 0) {
            return 'Cannot divide by zero';
        }
        return Math.round((this.a / this.b) * this.afterDecimal) / this.afterDecimal
    },
}