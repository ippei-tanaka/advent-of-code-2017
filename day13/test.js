import {getSeverity} from './task01';
import {getFewestDelay} from './task02';

const input = `
0: 3
1: 2
4: 4
6: 4
`;

test('task 01 example', () => {
    expect(getSeverity(input)).toBe(24);
});

test('task 02 example', () => {
    expect(getFewestDelay(input)).toBe(10);
});
