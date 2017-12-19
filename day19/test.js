import {getLettersOfTrace} from './task01';
import {countSteps} from './task02';

const input = `
     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 
`;

test('task 01 example', () => {
    expect(getLettersOfTrace(input)).toBe("ABCDEF");
});

test('task 02 example', () => {
    expect(countSteps(input)).toBe(38);
});
