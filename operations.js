function addOperation(op1, op2) {
    return op1 + op2;
}

function subtractionOperation(op1, op2) {
    return op1 - op2;
}

function multiplyOperation(op1, op2) {
    return op1 * op2;
}

function divisionOperation(op1, op2) {
    return op1 / op2;
}

export const add = addOperation;
export const subtract = subtractionOperation;
export const multiply = multiplyOperation;
export const divide = divisionOperation;