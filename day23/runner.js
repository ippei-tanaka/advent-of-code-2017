import fs from "fs";
import {countMultiplications} from './task01';
import {getValueOfH} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 23, Task 01: ${countMultiplications(data)}`);
    console.log(`Day 23, Task 02: ${getValueOfH()}`);
});