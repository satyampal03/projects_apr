const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req,res) => {
    const log = `New Request At ${Date.now()} : User Request : ${req.url}}`;

    fs.writeFile('log_file.txt', './', (err, result) =>{
           switch(req.url){
            case '/' :
                res.end('Home Page');
                break;
            case '/about' :
                res.end('About Us Page')
                break;
            default :
                res.end('404 Page Not Found');
           }
    })
})