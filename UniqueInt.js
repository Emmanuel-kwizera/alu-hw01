const fs = require('fs');

const inputDir = './sample_inputs';
const outputDir = './sample_results';

const inputFileName = process.argv[2];

const uniqueNumbers = extractUniqueIntegers(inputFileName);

writeToOutputFile(quickSort(uniqueNumbers));

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];  
    const left = arr.filter(num => num < pivot);   
    const right = arr.filter(num => num > pivot);  
    const equal = arr.filter(num => num === pivot); 

    return [...quickSort(left), ...equal, ...quickSort(right)];
}

function extractUniqueIntegers(inputFileName) {
    const fileContent = fs.readFileSync(`${inputDir}/${inputFileName}`, 'utf8');
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


function writeToOutputFile(sortedNumbers) {
    const outputFileStream = fs.createWriteStream(`${outputDir}/${inputFileName}_results.txt`);

    sortedNumbers.forEach(num => {
        outputFileStream.write(`${num}\n`);
    });

    outputFileStream.end();
}
