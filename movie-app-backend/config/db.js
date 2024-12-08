const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://anderssongarcia:Andersson1010116797@cluster0.uu1if.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    
});



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

module.exports = db;
