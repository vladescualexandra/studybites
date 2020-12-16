const db = require('../models/index');

module.exports.findAllShared = async (req, res) => {
    if (req.params.id > 0) {
        let user = await db.Users.findByPk(req.params.id);
        await db.Shared.findAll({
            include: [{
                model: db.Users,
                where: { id: user.id }
            }]
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

module.exports.findShared = async (req, res) => {
    await db.Shared.findByPk(req.params.id).then((result) => {
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
        let user = await  db.Users.findByPk(req.params.id);
        let shared = await  db.Shared.create({ 
            title: req.body.title, 
            content: req.body.content
        });
        
        let collaborator = await db.Collaborators.create({
            sharedId: shared.id, 
            userId: user.id
        })
        
        res.status(201).send(shared);
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

module.exports.findCollaborators = async (req, res) => {
    let shared = await db.Shared.findByPk(req.params.id);
    await db.Collaborators.findAll({
        where: {
            sharedId: shared.id
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