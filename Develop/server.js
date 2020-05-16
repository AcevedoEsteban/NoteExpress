const util = require("util");
const fs = require("fs");

const express = require("express");
const path = require("path");
var notes = require("./db/db.js");
const app = express();
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//any thing with this path "/notes" goes to the notes.html webpage
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// everything else that isnt defined goes to the home page aka index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db.json", "utf8", function (err, results) {
    if (err) throw err;
    res.json(JSON.parse(results));
  });
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`listenig on port ${port}`);
});

// app.get("api/notes", (req, res) => {
//   res.json(db);
// });
// // app.post("api/notes/", (req, res) => {
// //   const { title, text } = res.body;
// //   const newNote = { title, text };
// //   db.push(newNote);
// //   writeFileAsync("db/db.json", JSON.stringify(newNote));
// //   res.json(db);
// // });
