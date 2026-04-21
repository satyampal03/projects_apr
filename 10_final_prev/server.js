// require express fremwork
const express = require("express");
const app = express();
const userRouter = require('./routes/user.js');

// file system module
const {logReqRes,
       middleware2,
} = require('./middleware/index.js');
// mongoose for connection backend to frontend
const {connectMongoDB} = require('./connection.js');
 
connectMongoDB('mongodb://127.0.0.1:27017/inch').then(()=>{
  console.log('Mongo DB Connected Successfuly');
})


  // middleware to read the urlencoded data 
  app.use(express.urlencoded({ extended: false }));


  // middleware, 1 
  app.use(logReqRes('demo.txt'));
 
  // middleware, 2
app.use(middleware2());

// user router 
app.use('/user', userRouter);

// server PORT
const PORT = 8000 || 100;
// creating tjhe server
app.listen(PORT, () => {
  console.log("Your Server is running On Port -", PORT);
});