const express = require("express");
const app = express();

const fs = require("fs");

// users data
const users = require("./data.json");

// const { compose } = require('stream');

// middleware to read the ulrencoded data that coming thrue the postman
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("this is the middleware 1");

  fs.appendFile("./log.txt", `${Date.now()}: ${req.method}: ${req.path} \n`, (err,data)=>{
//    console.log(data);
   console.log(err);
  });
  // res.send('midleware 1 working')

  next();
});

app.use((req, res, next) => {
  console.log("this is the middleware 2");
  // res.send('midleware 2 working')
  next();
});

// get data on '/' in html format
app.get("/users", (req, res) => {
//   res.send("now users functions is working");

  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
  res.send(html);
});

// get data in json format '/api' path.
app.get("/api/users", (req, res) => {
  res.json(users);
});

// sending the data to the server using the post method
app.post("/user", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("./data.json", JSON.stringify(users), (err, data) => {
    res.json({ status: "user created Sucess", id: users.length });
  });
  // console.log(body);?
});

// creating the port on which port the server will run..
const PORT = 8000 || 100;

// creating tjhe server
app.listen(PORT, () => {
  console.log("Your Server is running On Port -", PORT);
});
