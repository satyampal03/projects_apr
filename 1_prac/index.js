
const s = 1099;


// const { isUtf8 } = require('buffer');
const fs = require('fs');

// sync 
// fs.writeFileSync('./rol.txt',  'this is the Rol file'  )

// async

// fs.writeFile('./newTest.txt', 'new text file created here', (err) => {})  

 const result = fs.readFileSync('./package.json', 'Utf-8'); // file can easily read thrue this 

//  console.log(result);

// fs.appendFileSync('./log.txt', `${Date.now()} I'm user -----1\n`);

// fs.copyFileSync('./log.txt', './copy.txt'); 


