import fs from "fs";
import {getLargestValueAfterOperations} from './task01';
import {getLargestValueDuringOperations} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 08, Task 01: ${getLargestValueAfterOperations(data)}`);
    console.log(`Day 08, Task 02: ${getLargestValueDuringOperations(data)}`);
});