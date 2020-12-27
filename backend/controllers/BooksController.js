const db = require('../models/index');

module.exports.findAllBooks = async (req, res) => {
    if (req.params.id > 0) {
        let user = await db.Users.findByPk(req.params.id);
        db.Books.findAll({
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
}

module.exports.findBook = (req, res) => {
    db.Books.findByPk(req.params.id).then((result) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send('book not found');
        }
    }).catch((err) => {
        res.status(500).send('error: ' + err);
    })
};

module.exports.createBook = async (req, res) => {
    try {
        let user = await db.Users.findByPk(req.params.id);
        let book = await  db.Books.create({
            userID: user.id,
            name: req.body.name
        });
        res.status(201).send(book);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

module.exports.updateBook = (req, res) => {
    db.Books.findByPk(req.params.id).then((message) => {
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
};

module.exports.deleteBook = (req, res) => {
    db.Books.findByPk(req.params.id).then((message) => {
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

module.exports.findNotesByBook = async (req, res) => {
    let book = await db.Books.findByPk(req.params.id);
    db.Notes.findAll({
        where : {
            bookID: book.id
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
}