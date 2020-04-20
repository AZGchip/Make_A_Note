//dependencies 
const express = require("express");
const fs = require("fs")
const app = express();
const path = require("path");
//PORT 
const PORT = 7500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sends notes.html when /notes is requested
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname,"../","public","notes.html"))
})
//if anything except the app.get above is requested, sends index.html
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname,"../","public", "index.html"))
})

//port listener
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});