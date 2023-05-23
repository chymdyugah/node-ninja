http = require('http');

const server = http.createServer((req, res) =>{
    console.log('request made');
    // res.write("Hello World!");
    res.end();
})

server.listen(3000, 'localhost', ()=>{
    console.log('listening on port 3000');
})