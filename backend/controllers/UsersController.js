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

module.exports.validateUser = async (req, res) => {
    try {
        let email = req.params.email;
        let password = req.params.password;
        let user = await db.Users.findAll({
            where: {
                email: email,
                password: password
            }
        });
        console.log(user);
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
}

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