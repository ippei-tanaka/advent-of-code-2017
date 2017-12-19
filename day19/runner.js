import fs from "fs";
import {getLettersOfTrace} from './task01';
import {countSteps} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 19, Task 01: ${getLettersOfTrace(data)}`);
    console.log(`Day 19, Task 02: ${countSteps(data)}`);
});