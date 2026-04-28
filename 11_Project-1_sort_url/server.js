const express = require('express'); // require Express
const app = express(); // using express as the App Middleware
const PORT = 8000 // Created PORT for Backend Server

const connectToMongoDB = require('./connection'); // connection Backend to DB

connectToMongoDB('mongodb://127.0.0.1:27017/sachin')
.then(()=>{
    console.log('DB connected Succesfully');
}) // DB 


const urlRoute = require('./routes/urlRoute'); // route require

app.use(express.json) // pares the body


app.use('/url', urlRoute);


app.listen(PORT, ()=>{
    console.log(`Server is Running on PORT No- ${PORT}`);

})