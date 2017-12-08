import {getLargestValueAfterOperations} from './task01';
import {getLargestValueDuringOperations} from './task02';

const input = `
b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10 
`;

test('task 01 example', () => {
    expect(getLargestValueAfterOperations(input)).toBe(1);
});

test('task 02 example', () => {
    expect(getLargestValueDuringOperations(input)).toBe(10);
});
