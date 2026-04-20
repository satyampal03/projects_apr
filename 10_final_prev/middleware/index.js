const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}\n`,
      (err, data) => {
        next();
      }
    );
  };
}

function middleware2() {
  return (req, res, next) => {
  console.log("this is the middleware 2");
  // res.send('midleware 2 working')
  next();
}
}





module.exports ={
    logReqRes,
    middleware2,
}