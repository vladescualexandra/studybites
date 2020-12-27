const db = require('../models/index');

module.exports.findAllNotes = async (req, res) => {
    try {
        if (req.params.id > 0) {
            let user = await db.Users.findByPk(req.params.id);
            db.Notes.findAll({
                where : {
                    userID: user.id
                }
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
        } else {
            res.status(404).send('user not found');
        }
    } catch (err) {
        console.log("ERROR: ", err);
    }
    
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
            bookID: 1, 
            title: req.body.title, 
            content: req.body.content
        });
        res.status(201).send(note);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

module.exports.updateNote = (req, res) => {
    db.Notes.findByPk(req.params.id).then((message) => {
        if (message) {
            message.update(req.body).then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                console.lof(err);
                res.status(500).send('database error');
            });
        } else {
            res.status(404).send('resource not found');
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send('database error');
    })
}

module.exports.deleteNote = (req, res) => {
    db.Notes.findByPk(req.params.id)
    .then((message) => {
        if (message) {
            message.destroy().then((result) => {
                res.status(204).send('resource deleted');
            }).catch((err) => {
                console.log(err);
                res.status(500).send('database error');
            })
        } else {
            res.status(404).send('resource not found');
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send('database error')
    })
}