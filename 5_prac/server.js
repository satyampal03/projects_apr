const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');


const app = express();

app.get('/', (req,res)=>{
    return res.send('this response from the serer on home page')
});

app.get('/about', (req,res)=>{
    return res.send('this response from the serer on about page')
});

const server = http.createServer(app);

server.listen(800);