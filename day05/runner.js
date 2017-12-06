import fs from "fs";
import {countSteps as countSteps1} from "./task01";
import {countSteps as countSteps2} from "./task02";

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const offsets = data.trim().split('\n').map(n => Number.parseInt(n));
    console.log(`Day 05, Task 01: ${countSteps1(offsets)}`);
    console.log(`Day 05, Task 02: ${countSteps2(offsets)}`);
});