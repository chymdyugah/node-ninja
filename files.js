const fs = require('fs');

// reading a fille
fs.readFile('./people.js', (err, data) => {
    if (err) {
        console.error(err);
    }
    console.log(data.toString());
})
fs.mkdir

console.log("last line");