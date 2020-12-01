const db = require('../models/index');

module.exports.findUser = (req, res) => {
    db.Users.findByPk(req.params.id).then((result) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send('user not found');
        }
    }).catch((err) => {
        res.status(500).send('error: ' + err);
    })
};

module.exports.createUser = async (req, res) => {
    try {
        let user = await db.Users.create({
            name: req.body.name,
            email: req.body.email, 
            password: req.body.password
        });
        res.status(201).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
}

module.exports.findAllNotes = async (req, res) => {
    let user = await db.Users.findByPk(req.params.id);
    db.Notes.findAll({
        userID: user.id
    }).then((result) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send('not found');
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send('server error');
    });
}

module.exports.findNote = (req, res) => {
    db.Notes.findByPk(req.params.id).then((result) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send('note not found');
        }
    }).catch((err) => {
        res.status(500).send('error: ' + err);
    })
};

module.exports.createNote = async (req, res) => {
    try {
        let user = await db.Users.findByPk(req.params.id);
        let note = await  db.Notes.create({
            userID: user.id,
            bookID: 0, 
            title: req.body.title, 
            content: req.body.content
        });
        req.status(201).send(note);
    } catch (err) {
        console.log(err);
        req.status(500).send('Server error');
    }
}