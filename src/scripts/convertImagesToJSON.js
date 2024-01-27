const fs = require('fs');
const path = require('path');

const directoryPath = './src/assets/pokemon-images'; 
const jsonFilePath = './src/data/pokemonImages.json'; 

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }

  const pngFiles = files.filter(file => path.extname(file) === '.png');
  const jsonContent = JSON.stringify(pngFiles, null, 2);

  fs.writeFile(jsonFilePath, jsonContent, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing JSON file: ${err}`);
    } else {
      console.log(`JSON file (${jsonFilePath}) generated successfully.`);
    }
  });
});
