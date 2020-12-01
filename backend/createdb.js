const db = require('./models/index');

db.sequelize.sync({force: true}).then(async () => {
    console.log('tables created');

}).catch((err) => {
    console.log(err);
    console.log('could not create tables');
});