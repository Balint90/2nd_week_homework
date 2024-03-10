import chalk from 'chalk';
import readline from 'readline/promises';
import { add, subtract, multiply, divide } from './operations.js';

let rl = null;
let op = null, op1 = null, op2 = null;

export default async function calculator() {
    initInput();
    await getInput();
    await calculate();
    await rl.close();
}


function initInput() {
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
};

function isNumber(number) {
    return typeof number === 'number' && !isNaN(number);
}

async function getOperation() {
    const operation = await rl.question('Which operation would you like to perform? (+, -, *, /): ');

    let operations = ["+", "-", "*", "/"];

    if (operations.includes(operation)) {
        return operation;
    } else {
        console.log("That is not a possible operation!");
        return getOperation();
    }
}

async function getNumber(message) {
    const op = parseInt(await rl.question(message), 10);
    if (!isNumber(op)) {
        console.log("The given input is not a number! Try again...");
        return getNumber(message);
    }
    return op;
}

async function getInput() {
    op = await getOperation();
    op1 = await getNumber("Give me the first operand: ");
    op2 = await getNumber("Give me the second operand: ");
}

async function calculate() {
    const output = `${chalk.yellow(op1)} ${chalk.red(op)} ${chalk.yellow(op2)} ${chalk.blue('=')}`;
    switch (op) {
        case "+":
            console.log(`${output} ${chalk.green(add(op1, op2))}`);
            break;
        case "-":
            console.log(`${output} ${chalk.green(subtract(op1, op2))}`);
            break;
        case "*":
            console.log(`${output} ${chalk.green(multiply(op1, op2))}`);
            break;
        case "/":
            console.log(`${output} ${chalk.green(divide(op1, op2))}`);
            break;
        default:
            console.log("That is not an operation! Try again!");
            return getInput();
    }
}
