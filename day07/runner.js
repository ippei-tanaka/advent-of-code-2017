import fs from "fs";
import {getBottomProgramName} from './task01';
import {getCorrectWeightOfProgram} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 07, Task 01: ${getBottomProgramName(data)}`);
    console.log(`Day 06, Task 02: ${getCorrectWeightOfProgram(data)}`);
});