const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express(); // handler function
const fs = require('fs');

// this module help to the read the form data that is comming through the url-encoded 
app.use(express.urlencoded({extended: false}));


app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
        </ul>
    `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

// geting only 1 user usoing id
app.get('/api/users/:id', (req,res)=>{
    const paraId = Number(req.params.id);
    const user = users.find((user) =>  user.id === paraId);

    if (!user) return res.status(404).json({error: "User Not Found"}); 
   return  res.json(user);
})

app.post('/api/user', (req,res)=>{
    const body = req.body;
    
    users.push({...body, id:users.length+1});
     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (error) => {
        if (error) {
            return res.status(500).json({ status: "error", message: "Failed to write file" });
        }
        return res.json({ status: 'successfully pushed', id:users.length});
    });
}) 

app.patch('/api/user:id', (req,res)=>{
    
    const userUpdateId = Number(req.params.id);
    const body = req.body;

    // getting the index of the lead
    const userIndex = users.find((user)=>user.id === userUpdateId);

    // returning the error message if there is not the user found log the message to the user
    if(userIndex === -1) {
        return req.status(404).json({error:'User Not Found'});
    }

    // updating the user information using js object, using this object the 1st value of the user will be replaced by the 2nd value
    users[userIndex] = {...users[userIndex], ...body};


    // this fs moodule is helping to push the updated user infomation
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (error) => {
        if (error) {
            return res.status(500).json({ status: "error", message: "Failed to write file" });
        }
        return res.json({ status: 'successfully pushed', id:users.length});
    });

}) 

app.delete('/api/user', (req,res)=>{
        return res.json({status : 'pending'});
}) 


// Server is Running PORT
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});