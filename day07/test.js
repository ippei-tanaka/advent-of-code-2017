import {getBottomProgramName} from './task01';
import {getCorrectWeightOfProgram} from './task02';

const input = `
pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)    
    `;

test('task 01 example', () => {
    expect(getBottomProgramName(input)).toBe("tknk");
});

test('task 02 example', () => {
    expect(getCorrectWeightOfProgram(input)).toBe(60);
});
