module.exports = function(sequelize, DataTypes) {
    const Reminders = sequelize.define("reminders", {
        userID: DataTypes.INTEGER, 
        title: DataTypes.STRING, 
        details: DataTypes.STRING
    });
    return Reminders;
}