const fs = require('fs');

const emmanuelInputDir = './sample_inputs';
const emmanuelOutputDir = './sample_results';

const inputFileName = process.argv[2];

const uniqueNumbers = extractUniqueIntegers(inputFileName);

writeToOutputFile(quicksort(uniqueNumbers));

function extractUniqueIntegers(inputFileName) {
    const fileContent = fs.readFileSync(`${emmanuelInputDir}/${inputFileName}`, 'utf8');
    const lines = fileContent.split('\n');

    const numberSet = new Set(); 
    let validNumbers = [];

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (/^[-+]?\d+$/.test(trimmedLine)) { 
            const num = parseInt(trimmedLine, 10);
            if (num >= -1023 && num <= 1023 && !numberSet.has(num)) {
                numberSet.add(num);
                validNumbers.push(num);
            }
        }
    });

    return validNumbers;
}

function quicksort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];  // Use the middle element as the pivot
    const left = arr.filter(num => num < pivot);   // Elements smaller than the pivot
    const right = arr.filter(num => num > pivot);  // Elements greater than the pivot
    const equal = arr.filter(num => num === pivot); // Elements equal to the pivot

    return [...quicksort(left), ...equal, ...quicksort(right)];
}

function writeToOutputFile(sortedNumbers) {
    const outputFileStream = fs.createWriteStream(`${emmanuelOutputDir}/${inputFileName}_results.txt`);

    sortedNumbers.forEach(num => {
        outputFileStream.write(`${num}\n`);
    });

    outputFileStream.end();
}
