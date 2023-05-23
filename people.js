const {people, ages} = require('./modules');
const os = require('os');
console.log(os.platform(), os.userInfo(), os.homedir())
console.log(people, ages)