import {getChecksum} from './task01';
// import {getStrengthOfLongestBridge} from './task02';

const input = `
Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
`;

test('task 01 example', () => {
    expect(getChecksum(input)).toBe(3);
});

// test('task 02 example', () => {
//     expect(getStrengthOfLongestBridge(input)).toBe(19);
// });