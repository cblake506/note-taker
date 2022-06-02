const express = require("express");
const path = require("path");
const fs = require("fs");
var noteList = require("./Develop/db/db.json");

const app = express();
const PORT = process.env.PORT || 3001 ; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./Develop/public")));

app.get("/notes", (req, res) => 
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
);

app.get("/api/notes", (req,res) => 
  {res.json(noteList)}
);

app.get("*", (req, res) => 
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
);

app.post("/api/notes", (req, res) => {
  //random id number for each note. Possible for certain ids to overlap.
  req.body.id = Math.floor((Math.random() * 10000));
  let newNote = req.body;

  noteList.push(newNote);

  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  //remove the notes that correspond to the id of the note desired to be deleted from the list
  noteList = noteList.filter(notes => notes.id != id);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteList));
  res.json(noteList);
})

app.listen(PORT, () => 
  console.log(`App listening on PORT ${PORT}`)
);
