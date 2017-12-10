import fs from "fs";
import {getScoreOf} from './task01';
import {countNonCanceledChars} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 09, Task 01: ${getScoreOf(data)}`);
    console.log(`Day 09, Task 02: ${countNonCanceledChars(data)}`);
});