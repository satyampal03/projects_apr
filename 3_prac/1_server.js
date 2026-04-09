const http = require('http');
const fs = require('fs');

// url module is node-4 version is already build in tool 
const url = require('url');


const myServer = http.createServer((req, res) => {

    if (req.url === '/favicon.ico') return res.end();
    if(req.url === '/.well-known/appspecific/com.chrome.devtools.json') return res.end();

    const log = `${new Date().toISOString()} : ${req.method} : ${req.url}\n`;
    const myUrl = url.parse(res.url,true);
    // const myUrl = url.parse(req.url, true); 

    console.log(myUrl);


    // Use appendFile so you don't delete previous logs
    fs.appendFile('./logs.txt', log, (err) => {
        if (err) console.error("Logging failed", err);

        switch(req.url) {
            case '/':
                res.end('Home Page');
                break;
            case '/about':
                res.end('About Us Page');
                break;
            default:
                res.statusCode = 404;
                res.end('404 Page Not Found');
        }
    });
});

const PORT = 3000; // Safer for development
myServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
