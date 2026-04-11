const http = require("http"); // http module use for make the request on the server,

const fs = require("fs"); // fs stands for file system that will us to direct ineract with the file/folder, create, read, write and delete, (directly help to communicate with the file system)

// in node v-4 url module is integreted in this
const url = require("url"); // url will help to read the url type, parameter, and also query param, what reqest is there it all about in the url, (essentially it help to react a URL)

const myServer = http.createServer((req, res) => {
  // created the server (with two param's to sent req, and get res from the server)

  // console.log('=================>',res);

  if (req.url === "/favicon.ico") return res.end(); // will return null
  if (req.url === "/.well-known/appspecific/com.chrome.devtools.json")
    return res.end(); // this will also return null

  const log = `[${new Date().toLocaleString()}] ${req.method} :PATH: ${req.url} \n`;
  // just created a log for the user track

  // use the req insted of response here
  const myurl = url.parse(req.url, true);

  console.log(myurl);

  fs.appendFile("./log.txt", log, (err, result) => {
    if (err) console.log("Failed to Server Load", err);

    switch (req.url) {
      case "/":
        if (req.method === "GET") {
          res.end(
            "This is Home Section : you will know all the information about the businesss right here",
          );
        }
        break;
      case "/login":
        if (req.method === "GET") {
          res.end(
            "fill you information to be proceed next for access the more content",
          );
        } else if (req.method === "POST") {

            // we will save the data into the database here and after sent the request we will sent the response to the use like successfully login 
            res.end('successfully sign-up')
        }
        break;

      case "/about":
        res.end(
          "This is the About Section : there you will find the infomation about the business, and what actuallu business provides the Services that all the things are here",
          `${req.query.myname}`
        );
        break;
      default:
        res.end("404 Page Not Found", "Chud gye GURU nhi chalega abb ye to ");
    }
  });
});

const PORT = 4000 || 3000;

myServer.listen(PORT, () => {
  console.log(`Server is Runing on Port ${PORT}`);
});
