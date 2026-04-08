const fs = require('fs');

// fs.readFile('../../../lyvorix/package-lock.json', 'utf-8', (err, responce)=>{
//     console.log(err);
//     // console.log(responce);
// });

// fs.readFileSync('../../../lyvorix/package-lock.json', 'utf-8');

const os = require('os');

console.log(os.cpus().length); // in  my pc has 12 core cpu