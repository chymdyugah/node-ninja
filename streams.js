const fs = require('fs');

const readStr = fs.createReadStream('./files.js', { encoding: 'utf8' });
const writeStr = fs.createWriteStream('./try.js');
readStr.on('data', (stream) => {
    console.log('---new stream--')
    writeStr.write(stream);
})

// using pipe instead of the on event handler
readStr.pipe(writeStr);