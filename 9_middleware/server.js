const express = require("express");
const app = express();

const fs = require("fs");

// require the mongoose package that help to connect the backend to the database server

const mongoose = require("mongoose");
// const { use } = require("react");

// connection with the db
mongoose
  .connect("mongodb://127.0.0.1:27017/inch")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));

// this is the user Schema that will be the validate when user will create.
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

//user
const User = mongoose.model("users", userSchema);

// const { compose } = require('stream');

// middleware to read the ulrencoded data that coming thrue the postman
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("this is the middleware 1");

  fs.appendFile(
    "./log.txt",
    `${Date.now()}:-->${req.ip}--> ${req.method}: ${req.path} \n`,
    (err, data) => {
      //    console.log(data);
      //  console.log(err);
    },
  );
  // res.send('midleware 1 working')

  next();
});

app.use((req, res, next) => {
  console.log("this is the middleware 2");
  // res.send('midleware 2 working')
  next();
});

// get data on '/' in html format
app.get("/users", async (req, res) => {
  //   res.send("now users functions is working");

  const data = await User.find();

  const html = `
        <ul>
            ${data.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
  res.send(html);
});

// get data in json format '/api' path.
app.get("/api/users", async (req, res) => {
  const data = await User.find(); // empty find means whole data

  res.json(data);
});

app.get("/users/:id", async (req, res) => {
  const userId = Number(req.params.id);

  const data = await User.find((u) => {
    u.d === userId;
  });

  if (!data) return res.status(404).json({ message: "User Not Found" });

  return res.send(data);
});

// sending the data to the server using the post method
app.post("/user", async (req, res) => {
  /*
  const body = req.body;
  
  if (
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({
      message: "All Fields are Required",
    });
  }

  // user creations

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gent,
  });

    */

  const { first_name, last_name, email, gender, job_title } = req.body;

  // console.log(first_name, last_name, email, gender, job_title);

  if (!first_name || !last_name || !email || !gender || !job_title) {
    return res.status(400).json({
      message: "All Fields are Required",
    });
  }

  const result = await User.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    gender: gender,
    job_title: job_title,
  });

  console.log(result);
  res.status(201).json({
    message: "User Created Successfully",
  });
});

// creating the port on which port the server will run..
const PORT = 8000 || 100;

// creating tjhe server
app.listen(PORT, () => {
  console.log("Your Server is running On Port -", PORT);
});
