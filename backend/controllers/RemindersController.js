const db = require('../models/index');
const Reminders = require('../models/Reminders');

module.exports.findAllReminders = async (req, res) => {
    if (req.params.id > 0) {
        let user = await db.Users.findByPk(req.params.id);
        db.Reminders.findAll({
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

module.exports.findReminder = (req, res) => {
    db.Reminders.findByPk(req.params.id).then((result) => {
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send('reminder not found');
        }
    }).catch((err) => {
        res.status(500).send('error: ' + err);
    })
};

module.exports.createReminder = async (req, res) => {
    try {
        let user = await db.Users.findByPk(req.params.id);
        let reminder = await  db.Reminders.create({
            userID: user.id,
            title: req.body.title, 
            content: req.body.content
        });
        res.status(201).send(reminder);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

module.exports.updateReminder = (req, res) => {
    db.Reminders.findByPk(req.params.id).then((message) => {
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

module.exports.deleteReminder = (req, res) => {
    db.Reminders.findByPk(req.params.id).then((message) => {
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