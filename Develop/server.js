const express = require("express");
const path = require("path");
const fs = require("fs");
var noteList = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3000 ; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => 
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/notes", (req, res) => 
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/api/notes", (req,res) => 
  {res.json(noteList)}
);

app.get("*", (req, res) => 
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.post("/api/notes", (req, res) => {
  //random id number for note
  req.body.id = Math.floor((Math.random() * 10000));
  let newNote = req.body;

  noteList.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
})

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  noteList = noteList.filter(notes => notes.id != id);

  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
})

app.listen(PORT, () => 
  console.log(`App listening on PORT ${PORT}`)
);
