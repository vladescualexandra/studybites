const db = require('../models/index');

module.exports.findUser = async (req, res) => {
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

module.exports.findUserByEmail = async (req, res) => {
    try {
        let user = await db.Users.findAll({
            where : {
                email: req.params.email
            }
        });
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('catch error');
    }
    
}

module.exports.validateUser = async (req, res) => {
    try {

        let encodedPassword = Buffer.from(req.params.password).toString('base64');        
        let email = req.params.email;
        let user = await db.Users.findAll({
            where: {
                email: email,
                password: encodedPassword
            }
        });
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
}

module.exports.createUser = async (req, res) => {
    try {

        let encodedPassword = Buffer.from(req.body.password).toString('base64');        
        let user = await db.Users.create({
            name: req.body.name,
            email: req.body.email, 
            password: encodedPassword
        });
        res.status(201).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
}