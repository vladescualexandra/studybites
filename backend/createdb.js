const express = require('express');
const app = express();
app.use('/', express.static('fontend'));
app.listen(8080);
const Sequelize = require('sequelize');

const db = require('./config/db.json');

const sequelize = new Sequelize(db.database, db.username, db.password, {
    dialect: 'mysql',
    host: db.host
});


sequelize.authenticate().then(() => {

    const Users = sequelize.define('Users', {
        username: Sequelize.STRING,
        fullname: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },    
        password: Sequelize.STRING, 
        notes: {
            type: Sequelize.INTEGER, 
            allowNull: true,
            set(val) {
                this.setDataValue('notes', val.join(';'));
            }
        }, // Array of ids
        shared: {
            type: Sequelize.INTEGER, 
            allowNull: true,
            set(val) {
                this.setDataValue('shared', val.join(';'));
            }
        }, // Array of ids
        books: {
            type: Sequelize.INTEGER, 
            allowNull: true,
            set(val) {
                this.setDataValue('books', val.join(';'));
            }
        }, // Array of ids
        reminders: {
            type: Sequelize.INTEGER, 
            allowNull: true,
            set(val) {
                this.setDataValue('reminders', val.join(';'));
            }
        } // Array of ids
    });
    
    const Notes = sequelize.define('Notes', {
        book: Sequelize.INTEGER, // Book's id
        title: Sequelize.STRING, 
        content: Sequelize.TEXT
    });
    
    const Books = sequelize.define('Books', {
        name: Sequelize.STRING, 
        notes: {
            type: Sequelize.INTEGER, 
            allowNull: true,
            get() {
                return this.getDataValue('notes').split(';')
            },
            set(val) {
                this.setDataValue('notes', val.join(';'));
            }
        } // Array of notes ids
    });
    
    const Reminders = sequelize.define('Reminders', {
        title: Sequelize.STRING, 
        details: Sequelize.STRING
    });
    
    const Shared = sequelize.define('Shared', {
        title: Sequelize.STRING, 
        content: Sequelize.TEXT, 
        collaborators: {
            type: Sequelize.INTEGER, 
            get() {
                return this.getDataValue('collaborators').split(';')
            },
            set(val) {
                this.setDataValue('collaborators', val.join(';'));
            }
        } // Array of users ids
    });
}).catch((err) => {
    console.log(err);
})



