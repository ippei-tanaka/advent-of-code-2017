import fs from "fs";
import {countInfections} from './task01';
// import {countPixels as countPixels2} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 22, Task 01: ${countInfections(data, 10000)}`);
    //console.log(`Day 22, Task 02: ${countPixels2(pattern, data, 18)}`);
});