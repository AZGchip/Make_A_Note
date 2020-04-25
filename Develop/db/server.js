//dependencies 
const express = require("express");
const fs = require("fs")
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//allows access to static files
app.use(express.static(path.join(__dirname, "../", "public")))

//sends notes.html when /notes is requested
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../", "public", "notes.html"))
})
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db.json"))
})

//if anything except the app.get above is requested, sends index.html
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../", "public", "index.html"))

})
app.post("/api/notes", function (req, res) {

    let newNote = req.body;
    // newNote.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
    fs.readFile("./db.json", function (err, data) {
        let json = JSON.parse(data);
        json.push(newNote);
        fs.writeFile("./db.json", JSON.stringify(json), function (err, result) {
            if (err) {
                console.log(err)
            }
            res.json(json)
        });
    })
});
app.delete("/api/notes/:id", function (req, res) {
    let deleteId = req.params.id
    console.log("the id is..." + req.params.id)
    fs.readFile("./db.json", function (err, data) {
        if (err) {
            console.log(err)
        }
        let json = JSON.parse(data)
        console.log(json)
        json.forEach(x => {
            let index = json.indexOf(x)
            if (x.id != undefined && x.id === deleteId) {
                json.splice(index, 1)
            }
        });
        fs.writeFile("./db.json", JSON.stringify(json), function (err, result) {
            if (err) {
                console.log(err)
            }
            res.json(json)
        });

    })
})



//port listener
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});