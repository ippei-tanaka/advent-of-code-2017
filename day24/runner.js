import fs from "fs";
import {getStrengthOfStrongestBridge} from './task01';
// import {countInfections as countInfections2} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 24, Task 01: ${getStrengthOfStrongestBridge(data)}`);
    // console.log(`Day 24, Task 02: ${countInfections2(data, 10000000)}`);
});