const readline = require('readline');
const fs = require('fs');


const inputFilePath = 'input.ndjson'; // Replace with your input file path
const outputFilePath = 'output.txt'; // Replace with your desired output file path

const inputFileStream = fs.createReadStream(inputFilePath);


const rl = readline.createInterface({
  input: inputFileStream,
  crlfDelay: Infinity,
});

const parsedObjects = [];

rl.on('line', (line) => {
  try {

    const jsonObject = JSON.parse(line);
    parsedObjects.push(jsonObject);
  } catch (error) {

    console.error('Error parsing line:', error);
  }
});


rl.on('close', () => {
 
  const jsonString = JSON.stringify(parsedObjects, null, 2);

  // Write the JSON string to the output file
  fs.writeFile(outputFilePath, jsonString, (err) => {
    if (err) {
      console.error('Error writing to output file:', err);
    } else {
      console.log(`Parsed data has been saved to ${outputFilePath}`);
    }
  });
});
