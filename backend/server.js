const express = require('express');
const app = express();
app.use('/', express.static('fontend'));
app.listen(8080);
const Sequelize = require('sequelize');

const db = require('./config/db.json');

const sequelize = new Sequelize(db.database, db.username, db.password, {
    dialect: 'mysql',
    host: db.host
});


sequelize.authenticate().then(() => {
    console.log("Connected to database.");
}).catch((err) => {
    console.log(err);
    console.log("Unable to connect to database.");
})

const Users = sequelize.define('Users', {
    username: Sequelize.STRING,
    fullname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },    
    password: Sequelize.STRING, 
    notes: {
        type: Sequelize.INTEGER, 
        allowNull: true,
        set(val) {
            this.setDataValue('notes', val.join(';'));
        }
    }, // Array of ids
    shared: {
        type: Sequelize.INTEGER, 
        allowNull: true,
        set(val) {
            this.setDataValue('shared', val.join(';'));
        }
    }, // Array of ids
    books: {
        type: Sequelize.INTEGER, 
        allowNull: true,
        set(val) {
            this.setDataValue('books', val.join(';'));
        }
    }, // Array of ids
    reminders: {
        type: Sequelize.INTEGER, 
        allowNull: true,
        set(val) {
            this.setDataValue('reminders', val.join(';'));
        }
    } // Array of ids
});

const Notes = sequelize.define('Notes', {
    book: Sequelize.INTEGER, // Book's id
    title: Sequelize.STRING, 
    content: Sequelize.TEXT
});

const Books = sequelize.define('Books', {
    name: Sequelize.STRING, 
    notes: {
        type: Sequelize.INTEGER, 
        allowNull: true,
        get() {
            return this.getDataValue('notes').split(';')
        },
        set(val) {
            this.setDataValue('notes', val.join(';'));
        }
    } // Array of notes ids
});

const Reminders = sequelize.define('Reminders', {
    title: Sequelize.STRING, 
    details: Sequelize.STRING
});

const Shared = sequelize.define('Shared', {
    title: Sequelize.STRING, 
    content: Sequelize.TEXT, 
    collaborators: {
        type: Sequelize.INTEGER, 
        get() {
            return this.getDataValue('collaborators').split(';')
        },
        set(val) {
            this.setDataValue('collaborators', val.join(';'));
        }
    } // Array of users ids
});


app.get('/createdb', (request, response) => {
    sequelize.sync({force: true}).then(() => {
        response.status(201).send('tables created');
    }).catch((err) => {
        console.log(err);
        response.status(500).send('could not create tables');
    });
});

app.use(express.json());
app.use(express.urlencoded());

// LOGIN
app.get('/users/:id', (request, response) => {
    Users.findByPk(request.params.id).then((result) => {
        if (result) {
            response.status(200).json(result);
        } else {
            response.status(404).send('User not found.');
        }
    }).catch((err) => {
        console.log(err);
        console.status(500).send('database error');
    });
});

// ALL NOTES
app.get('/notes', (request, response) => {
    Notes.findAll().then((result) => {
        if (result) {
            response.status(200).json(result);
        } else {
            response.status(404).send('Notes not found.');
        }
    }).catch((err) => {
        console.log(err);
        console.status(500).send('database error');
    });

});

// NOTE BT ID
app.get('/notes/:id', (request, response) => {
    Notes.findByPk(request.params.id).then((result) => {
        if (result) {
            response.status(200).json(result);
        } else {
            response.status(404).send('Note not found.');
        }
    }).catch((err) => {
        console.log(err);
        console.status(500).send('database error');
    });
});


// ALL BOOKS
app.get('/books', (request, response) => {
    Books.findAll().then((result) => {
        if (result) {
            response.status(200).json(result);
        } else {
            response.status(404).send('Books not found.');
        }
    }).catch((err) => {
        console.log(err);
        console.status(500).send('database error');
    });
});

// BOOK BY ID
app.get('/books/:id', (request, response) => {
    Books.findByPk(request.params.id).then((result) => {
        if (result) {
            response.status(200).json(result);
        } else {
            response.status(404).send('Book not found.');
        }
    }).catch((err) => {
        console.log(err);
        console.status(500).send('database error');
    });
});

// ALL SHARED NOTES
app.get('/shared', (request, response) => {
    Shared.findAll().then((result) => {
        if (result) {
            response.status(200).json(result);
        } else {
            response.status(404).send('Shared notes not found.');
        }
    }).catch((err) => {
        console.log(err);
        console.status(500).send('database error');
    });
});

// SHARED NOTE BY ID
app.get('/shared/:id', (request, response) => {
    Shared.findByPk(request.params.id).then((result) => {
        if (result) {
            response.status(200).json(result);
        } else {
            response.status(404).send('Shared note not found.');
        }
    }).catch((err) => {
        console.log(err);
        console.status(500).send('database error');
    });
});

// ALL REMINDERS 
app.get('/reminders', (request, response) => {
    Reminders.findAll().then((result) => {
        if (result) {
            response.status(200).json(result);
        } else {
            response.status(404).send('Reminders not found.');
        }
    }).catch((err) => {
        console.log(err);
        console.status(500).send('database error');
    });
});

// REMINDER BY ID
app.get('/reminders/:id', (request, response) => {
    Reminders.findByPk(request.params.id).then((result) => {
        if (result) {
            response.status(200).json(result);
        } else {
            response.status(404).send('Reminder not found.');
        }
    }).catch((err) => {
        console.log(err);
        console.status(500).send('database error');
    });
});


// SIGN UP
app.post('/users', (request, response) => {
    Users.create(request.body).then((result) => {
        response.status(201).json(result);
    }).catch((err) => {
        console.log(err);
        response.status(500).send('resouce not created')
    });
});

// ADD NOTE
app.post('/notes', (request, response) => {
    Notes.create(request.body).then((result) => {
        response.status(201).json(result);
    }).catch((err) => {
        response.status(500).send('resource not created');
    });
});

// ADD BOOK
app.post('/books', (request, response) => {
    Books.create(request.body).then((result) => {
        response.status(201).json(result);
    }).catch((err) => {
        response.status(500).send('resource not created');
    });
});

// ADD SHARED NOTE
app.post('/shared', (request, response) => {
    Shared.create(request.body).then((result) => {
        response.status(201).json(result);
    }).catch((err) => {
        response.status(500).send('resource not created');
    });
});

// ADD REMINDER
app.post('/reminders', (request, response) => {
    Reminders.create(request.body).then((result) => {
        response.status(201).json(result);
    }).catch((err) => {
        response.status(500).send('resource not created');
    });
});