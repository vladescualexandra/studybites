const db = require('../models/index');

module.exports.findAllCollaborators = async (req, res) => {
    // await db.Collaborators.findByPk(req.params.id).then((result) => {
    //     if (result) {
    //         res.status(200).send(result);
    //     } else {
    //         res.status(404).send('not found');
    //     }
    // }).catch((err) => {
    //     console.log(err);
    //     res.status(500).send('server error');
    // });
}

module.exports.findCollaborators = async (req, res) => {
    
};

module.exports.createCollaborator = async (req, res) => {
    try {
        let collaborator = await db.Collaborators.create({
            sharedId: req.params.sharedId,
            userId: req.params.userId
        })
        res.status(201).send(collaborator);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

module.exports.updateCollaborator = (req, res) => {
    db.Collaborators.findByPk(req.params.id).then((message) => {
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

module.exports.deleteCollaborator = (req, res) => {
    db.Collaborators.findByPk(req.params.id).then((message) => {
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