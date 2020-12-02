const db = require('../models/index');

module.exports.findAllShared = async (req, res) => {
    let user = await db.Users.findByPk(req.params.id);
    let collabs = await db.Collaborators.findAll({
        userId: user.id
    })

    let result = [];
    let func = await function() {
    for (let key in collabs) {
    db.Shared.findAll(({
        id: collaborator.id
    })
}
    
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

module.exports.findShared = (req, res) => {
    let user = await db.Users.findByPk(req.params.id);
    db.Shared.findAll({
        userId: user.id
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