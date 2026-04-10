const http = require('http');
const fs = require('fs');

// in node v-4 url module is integreted in this

const  url = require('url');

const myServer = http.createServer((req, res) =>{

      if (req.url === '/favicon.ico') return res.end();
    if(req.url === '/.well-known/appspecific/com.chrome.devtools.json') return res.end();


   const log = `[${new Date().toLocaleString()}] PATH: ${req.url}\n`;


    // use the req insted of response here
    const myurl = url.parse(req.url, true);

    console.log(myurl);

    fs.appendFile('./log.txt', log, (err, result) =>{
        if(err) console.log('Failed to Server Load', err);

        switch(req.url){
            case '/':
                res.end('This is Home Section : you will know all the information about the businesss right here');
                break;
            case  '/about':
                res.end('This is the About Section : there you will find the infomation about the business, and what actuallu business provides the Services that all the things are here');
            break;
            default :
                res.end('404 Page Not Found', 'Chud gye GURU nhi chalega abb ye to ');
        }
    })
})

const PORT = 4000|| 3000;

myServer.listen(PORT , ()=>{
    console.log(`Server is Runing on Port ${PORT}`)
})