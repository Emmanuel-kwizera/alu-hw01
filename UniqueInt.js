const fs = require('fs');

const emmanuelInputDir = './sample_inputs';
const emmanuelOutputDir = './sample_results';

// Get the input filename from the command line
const inputFileName = process.argv[2];

// Extract unique integers from the input file
const uniqueNumbers = extractUniqueIntegers(inputFileName);

// Write the sorted numbers to the output file
writeToOutputFile(quicksort(uniqueNumbers));

/**
 * Extracts unique integers from a file
 * 
 * @param {string} inputFileName 
 * @returns {number[]} uniqueNumbers
 */
function extractUniqueIntegers(inputFileName) {
    const fileContent = fs.readFileSync(`${emmanuelInputDir}/${inputFileName}`, 'utf8');
    const lines = fileContent.split('\n');

    const numberSet = new Set(); // Use a Set to store unique numbers
    let validNumbers = [];

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (/^[-+]?\d+$/.test(trimmedLine)) { // Check if the line contains a valid integer
            const num = parseInt(trimmedLine, 10);
            if (num >= -1023 && num <= 1023 && !numberSet.has(num)) {
                numberSet.add(num);
                validNumbers.push(num);
            }
        }
    });

    return validNumbers;
}

/**
 * Sorts numbers using the quicksort algorithm
 * 
 * @param {number[]} arr
 * @returns {number[]} sortedNumbers
 */
function quicksort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];  // Use the middle element as the pivot
    const left = arr.filter(num => num < pivot);   // Elements smaller than the pivot
    const right = arr.filter(num => num > pivot);  // Elements greater than the pivot
    const equal = arr.filter(num => num === pivot); // Elements equal to the pivot

    // Recursively sort the left and right sub-arrays, and concatenate
    return [...quicksort(left), ...equal, ...quicksort(right)];
}

/**
 * Writes sorted numbers to the output file
 * 
 * @param {number[]} sortedNumbers 
 */
function writeToOutputFile(sortedNumbers) {
    const outputFileStream = fs.createWriteStream(`${emmanuelOutputDir}/${inputFileName}_results.txt`);

    sortedNumbers.forEach(num => {
        outputFileStream.write(`${num}\n`);
    });

    outputFileStream.end();
}
