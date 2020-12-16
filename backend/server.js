const express = require('express');
const app = express();
const router = express.Router();

const cors = require('cors');
app.use(cors());

const users = require('./routes/users');
const notes = require('./routes/notes');
const books = require('./routes/books');
const shared = require('./routes/shared');
const reminders = require('./routes/reminders');
const collaborators = require('./routes/collaborators');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', users);
app.use('/', notes);
app.use('/', books);
app.use('/', shared);
app.use('/', reminders);
app.use('/', collaborators);

app.use('/', express.static('../frontend/build'));

app.listen(8080);
