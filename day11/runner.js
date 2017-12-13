import fs from "fs";
import {getFewestNumberOfStep} from './task01';
import {getNumberOfStepForFurthest} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 11, Task 01: ${getFewestNumberOfStep(data)}`);
    console.log(`Day 11, Task 02: ${getNumberOfStepForFurthest(data)}`);
});