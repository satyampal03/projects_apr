const express = require('express');
const app = express();

app.get('/api/users'    , (req, res)=>{
      console.log('users Fetched Successfully');      
})

app.listen(PORT, ()=>{
      console.log('port is rinning on port', PORT)
})