import {getRecoveredFrequency} from './task01';
import {countSendings} from './task02';

const input = `
set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2
`;

test('task 01 example', () => {
    expect(getRecoveredFrequency(input)).toBe(4);
});

const input2 = `
snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d
`;

test('task 02 example', async () => {
    await expect(countSendings(input2)).resolves.toBe(3);
});
