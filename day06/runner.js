import fs from "fs";
import {countRedistributions as countRedistributions1} from "./task01";
import {countRedistributions as countRedistributions2} from "./task02";

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    const memoryBanks = data.trim().split(/\s+/).map(n => Number.parseInt(n));
    console.log(`Day 06, Task 01: ${countRedistributions1(memoryBanks)}`);
    console.log(`Day 06, Task 02: ${countRedistributions2(memoryBanks)}`);
});