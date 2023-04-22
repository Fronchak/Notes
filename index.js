const express = require('express');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const noteRoutes = require('./routes/note-routes');
const conn = require('./db/connection');

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => res.redirect('/notes'))
app.use('/notes', noteRoutes);

conn.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log('Connect with success');
            console.log(`Server listen on port ${PORT}`);
        })
    })
    .catch((e) => console.error('Erro ao conectar ao mongodb', e));

