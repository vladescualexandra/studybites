const db = require('../models/index');

module.exports.findAllShared = async (req, res) => {
    let user = await db.Users.findByPk(req.params.id);
    // TO DO
}

module.exports.findShared = (req, res) => {
    // TO DO
};

module.exports.createShared = async (req, res) => {
    try {
        // TO DO
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

module.exports.updateShared = (req, res) => {
    db.Shared.findByPk(req.params.id).then((message) => {
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

module.exports.deleteShared = (req, res) => {
    db.Shared.findByPk(req.params.id).then((message) => {
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