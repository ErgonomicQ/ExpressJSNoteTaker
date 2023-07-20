const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'Develop', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing to HTML
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop', 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop', 'public', 'index.html'));
});

// API routes
app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'Develop', 'db', 'db.json'), 'utf8'));
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // This will assign a new and unique id to the post
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'Develop', 'db', 'db.json'), 'utf8'));
  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, 'Develop', 'db', 'db.json'), JSON.stringify(notes));
  res.json(newNote);
});

// Server start
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});