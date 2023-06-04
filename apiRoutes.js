// Import the required modules:
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Define the routes:
module.exports = (app) => {
  // Read all notes
  app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));
    res.json(notes);
  });

  // Create a new note
  app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));
    const newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes));
    res.json(newNote);
  });

  // Delete a note by ID
  app.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));
    const noteId = req.params.id;
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(updatedNotes));
    res.sendStatus(200);
  });
};
