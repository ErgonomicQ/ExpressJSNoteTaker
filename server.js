const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.static(path.join(__dirname, 'Develop', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// API routes
app.post('/api/savednotes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // This will assign a new and unique id to the post
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'Develop', 'db', 'db.json'), 'utf8'));
  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, 'Develop', 'db', 'db.json'), JSON.stringify(notes));
  res.json(newNote);
});

app.get('/api/savednotes', (req, res) => {
  const filePath = path.join(__dirname, 'Develop', 'db', 'db.json');
  console.log(filePath); // Log the path to check if it's correct
  const notes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.json(notes);
});

// Routing to HTML
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop', 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop', 'public', 'index.html'));
});

// Server start
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});