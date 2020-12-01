const express = require('express');
const router = express.Router();

const notesController = require('../controllers/NotesController.js');

router.get('/users/:id/notes', notesController.findAllNotes)
router.get('/notes/:id', notesController.findNote);
router.post('/users/:id/notes', notesController.createNote);
router.put('/notes/:id', notesController.updateNote);
router.delete('/notes/:id', notesController.deleteNote);


module.exports = router