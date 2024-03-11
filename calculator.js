import chalk from 'chalk';
import { input, select } from '@inquirer/prompts';
import { add, subtract, multiply, divide } from './operations.js';

let operator = null, operand1 = null, operand2 = null;

export async function calculator() {
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
    const operand = parseInt(await input({ message }), 10);
    if (!isNumber(operand)) {
        console.log("The given input is not a number! Try again...");
        return getNumber(message);
    }
    if (operator === '/' && operand === 0) {
        console.log("Divide 0 or division by 0 is pointless. Please enter a number other than 0.");
        return getNumber(message);
    }
    return operand;
}

async function getInput() {
    operator = await getOperation();
    operand1 = await getNumber("Give me the first operand: ");
    operand2 = await getNumber("Give me the second operand: ");
}

async function calculate() {
    const output = `${chalk.yellow(operand1)} ${chalk.red(operator)} ${chalk.yellow(operand2)} ${chalk.blue('=')}`;
    switch (operator) {
        case "+":
            console.log(`${output} ${chalk.green(add(operand1, operand2))}`);
            break;
        case "-":
            console.log(`${output} ${chalk.green(subtract(operand1, operand2))}`);
            break;
        case "*":
            console.log(`${output} ${chalk.green(multiply(operand1, operand2))}`);
            break;
        case "/":
            console.log(`${output} ${chalk.green(divide(operand1, operand2))}`);
            break;
        default:
            console.log("That is not an operation! Try again!");
            return getInput();
    }
}
