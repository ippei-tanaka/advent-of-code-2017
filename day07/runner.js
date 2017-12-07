import fs from "fs";
import {getBottomProgramName as getBottomProgramName1} from './task01';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 07, Task 01: ${getBottomProgramName1(data)}`);
    //console.log(`Day 06, Task 02: ${countRedistributions2(memoryBanks)}`);
});