const express = require("express");

const PORT = process.envPORT || 3001;

const path = require("path");

const app = express();

const { notes } = require("./db/db.json");

const fs = require("fs");

const uniqid = require("uniqid");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

function newNote(note, noteArray) {
  noteArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: noteArray }, null, 2)
  );
  return note;
}

function deleteNote(noteId, noteArray) {
  noteArray.pop(noteId);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: noteArray }, null, 2)
  );
}

app.get("/api/notes", (req, res) => {
  const results = notes;
  res.json(results);
});

app.post("/api/notes", (req, res) => {
  req.body.id = uniqid();
  newNote(req.body, notes);
  res.json(req.body);
});

app.delete("/api/notes/:id", (req, res) => {
  const result = deleteNote(req.params.id, notes);
  if (result) {
    res.json(result + " Deleted");
  } else {
    res.sendStatus(404);
  }
});

// html route
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.listen(PORT, () => {
  console.log(`Server is now on port ${PORT}`);
});
