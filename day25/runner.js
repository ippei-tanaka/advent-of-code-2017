import fs from "fs";
import {getChecksum} from './task01';
//import {getStrengthOfLongestBridge} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 25, Task 01: ${getChecksum(data)}`);
    //console.log(`Day 25, Task 02: ${getStrengthOfLongestBridge(data)}`);
});