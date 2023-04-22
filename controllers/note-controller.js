const Note = require('../models/note');

class NoteController {

    static async showHome(req, res) {
        let notes = await Note.findAll();
        notes = notes.map((note, i) => {
            const { title, description } = note;
            return {
                id: note._id.toString(),
                index: i + 1,
                title, description
            }
        })
        const isEmpty = notes.length === 0;
        return res.render('home', { notes, isEmpty });
    }

    static showInsertForm(req, res) {
        res.render('notes/form', { 
            actionURL: "/notes", 
            description: '',
            formTitle: 'Add a new note',
            buttonLabel: 'Add note'
        });
    }

    static async save(req, res) {
        const { title, description } = req.body;
        const note = new Note(title, description);
        await note.save();
        return res.redirect('/notes');
    }

    static async showUpdataForm(req, res) {
        const { id } = req.params;
        const note = await Note.findById(id);
        if(!note) {
            return res.redirect('/notes');
        }
        return res.render('notes/form', {
            title: note.title,
            description: note.description,
            actionURL: `/notes/${note._id.toString()}`,
            formTitle: 'Update your note',
            buttonLabel: 'Update note'
        })
    }

    static async update(req, res) {
        const { id } = req.params;
        const { title, description } = req.body;
        const note = new Note(title, description, id);
        await note.update();
        return res.redirect('/notes');
    }

    static async delete(req, res) {
        const { id } = req.body;
        await Note.deleteById(id);
        return res.redirect('/notes');
    }

    static async showDetails(req, res) {
        const { id } = req.params;
        const note = await Note.findById(id);
        if(!note) {
            return redirect('/');
        }
        return res.render('notes/details', {
            id: note._id.toString(),
            title: note.title,
            description: note.description
        });
    }
}

module.exports = NoteController;