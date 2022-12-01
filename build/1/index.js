"use strict";
// read file
const fs = require('fs');
let content = '';
const readFile = (next) => {
    fs.readFile('days/1/input.txt', 'utf8', function (err, data) {
        if (err)
            throw err;
        content = data;
        next();
    });
};
const processFile = () => {
    const inputByElf = splitElves(content);
    const elfInventories = generateElfEnventories(inputByElf);
    // PT 1 answer
    // const richElf = getRichestElf(elfInventories);
    // console.log(richElf?.total);
    // PT 2 answer
    const richElves = getRichElves(elfInventories, 3);
    let total = 0;
    console.log("--- answer ---");
    console.log(richElves);
    for (const elf of richElves) {
        total += elf.total;
    }
    console.log(total);
};
const splitElves = (content) => {
    return content.split('\n\n');
};
const generateElfEnventories = (inputByElf) => {
    const elves = [];
    for (const input of inputByElf) {
        const inventory = generateInventory(input.split('\n'));
        const total = calculateTotal(inventory);
        elves.push({
            inventory,
            total
        });
    }
    return elves;
};
const generateInventory = (input) => {
    return input.map(a => Number(a));
};
const calculateTotal = (inventory) => {
    let total = 0;
    for (const value of inventory) {
        total += value;
    }
    return total;
};
const getRichestElf = (elves) => {
    let richBoi = elves[0];
    for (const elf of elves) {
        if (elf.total > richBoi.total) {
            richBoi = elf;
        }
    }
    return richBoi;
};
const getRichElves = (elves, amount) => {
    const clone = [...elves];
    const richBois = clone.splice(0, amount);
    const sortElves = () => richBois.sort((a, b) => b.total - a.total);
    sortElves();
    const replaceElf = (elf) => {
        const popped = richBois.pop();
        richBois.push(elf);
        sortElves();
        console.log('replacing', popped, 'with', elf);
        console.log('new result');
        console.log(richBois);
    };
    for (const elf of clone) {
        let leastRichBoi = richBois[amount - 1];
        if (elf.total > leastRichBoi.total) {
            replaceElf(elf);
        }
    }
    return richBois;
};
readFile(processFile);
