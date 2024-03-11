import chalk from 'chalk';
import { input, select } from '@inquirer/prompts';
import { add, subtract, multiply, divide } from './operations.js';

let op = null, op1 = null, op2 = null;

export default async function calculator() {
    await getInput();
    await calculate();
}

function isNumber(number) {
    return typeof number === 'number' && !isNaN(number);
}

async function getOperation() {
    return await select({
        message: 'Which operation would you like to perform?',
        choices: [
            {
                name: '+',
                value: '+',
                description: 'plus operator',
            },
            {
                name: '-',
                value: '-',
                description: 'minus operator',
            },
            {
                name: '*',
                value: '*',
                description: 'multiply operator'
            },
            {
                name: '/',
                value: '/',
                description: 'division operator'
            },
        ],
    });
}

async function getNumber(message) {
    const op = parseInt(await input({ message }), 10);
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
