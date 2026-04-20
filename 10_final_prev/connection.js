const mongoose = require("mongoose");

// db connections
// mongoose
//   .connect("mongodb://127.0.0.1:27017/inch")
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("Mongo Error", err));

async function connectMongoDB(url){
    return mongoose.connect(url);
}

module.exports = {
    connectMongoDB,
}