const Sequelize = require('sequelize');
const db = {};
const dbConfig = require('../config/db.json');

const sequelize = new Sequelize (dbConfig.database, dbConfig.username, dbConfig.password, {
    dialect: 'mysql', 
    host: dbConfig.host
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('An error has occured while trying to connect to the database: ', err);
    });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require('./Users')(sequelize, Sequelize);
db.Notes = require('./Notes')(sequelize, Sequelize);
db.Books = require('./Books')(sequelize, Sequelize);
db.Shared = require('./Shared.js')(sequelize, Sequelize);
db.Collaborators = require('./Collaborators')(sequelize, Sequelize);
db.Reminders = require('./Reminders')(sequelize, Sequelize);


db.Users.hasMany(db.Notes, {foreignKey: "userID"});
db.Users.hasMany(db.Books, {foreignKey: "userID"});
db.Users.hasMany(db.Shared, {foreignKey: "userID"});
db.Users.hasMany(db.Reminders, {foreignKey: "userID"});

db.Books.hasMany(db.Notes, {foreignKey: "bookID"});

db.Shared.belongsToMany(db.Users, {through: db.Collaborators}); // ?? not sure

module.exports = db;
