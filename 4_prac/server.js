const http = require("http");
const fs = require("fs");

const url = require("url");
const { log } = require("console");

const myserver = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end(); // will return null
  if (req.url === "/.well-known/appspecific/com.chrome.devtools.json")
    return res.end(); // retun null

  const userlog = `USER REQUESTED AT [${new Date().toLocaleString()}]: METHOD : ${req.method} Request url :${req.url} \n`;

// 1. PARSE THE URL FIRST
  const myUrl = url.parse(req.url, true); // true converts ?name=saim to {name: 'saim'}
  const pathname = myUrl.pathname;
  const query = myUrl.query;

  console.log(pathname)
  console.log(query);
  /*
  Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: [Object: null prototype] {},
  pathname: '/',
  path: '/',
  href: '/'
}
  */

  fs.appendFile("newlog.txt", userlog, (err, result) => {
    if (err) return err;

    switch (pathname) {
      case "/":
        if (req.method === "GET") {
          console.log("This is Home Section here");
          res.end(`This is Home Section here `)
        } else if (req.method === "POST") {
          console.log("user sending data on Home Page");
        } else if (req.method === "PUT") {
          console.log("user want to send the data here like meta on Home Page");
        } else if (req.method === "PATCH") {
          console.log("user want to UPDATE data on Home Page");
        } else {
          console.log("user want to detele some data on Home Page");
        }
        break; 


      case "/about":
        if (req.method === "GET") {
          console.log("This is About Section here");
          res.end(`This is About Section here `)
        } else if (req.method === "POST") {
          console.log("user sending data on About Page");
        } else if (req.method === "PUT") {
          console.log(
            "user want to send the data here like meta on About Page",
          );
        } else if (req.method === "PATCH") {
          console.log("user want to UPDATE data on About Page");
        } else {
          console.log("user want to detele some data on About Page");
        }
        break;

      case "/contact":
        if (req.method === "GET") {

            const name = query.name;
            const userid = query.userid;
            // console.log(name);

            res.end(`Welcom to Contact Page Mr/Mrs - ${name} and your id is ${userid}`);
          console.log(`Welcom to Contact Page Mr/Mrs - ${name} and  your id is ${userid}`);



        } else if (req.method === "POST") {
          console.log("user sending data on Contact Page");
        } else if (req.method === "PUT") {
          console.log(
            "user want to send the data here like meta on Contact Page",
          );
        } else if (req.method === "PATCH") {
          console.log("user want to UPDATE data on Contact Page");
        } else {
          console.log("user want to detele some data on Contact Page");
        }
        break;

        default:
        res.end("404 Page Not Found", "Chud gye GURU nhi chalega abb ye to ");
    }
  });
});

const PORT = 8000 || 3000;

myserver.listen(PORT, () => {
  console.log(`Server is runing on the Port ====> ${PORT}`);
});
