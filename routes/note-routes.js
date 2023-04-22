const express = require('express');
const NoteController = require('../controllers/note-controller');

const noteRoutes = express.Router();

noteRoutes.get('/', NoteController.showHome);
noteRoutes.get('/form', NoteController.showInsertForm);
noteRoutes.get('/form/:id', NoteController.showUpdataForm);
noteRoutes.get('/:id', NoteController.showDetails);
noteRoutes.post('/delete', NoteController.delete);
noteRoutes.post('/', NoteController.save);
noteRoutes.post('/:id', NoteController.update);

module.exports = noteRoutes;