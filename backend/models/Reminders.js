module.exports = function(sequelize, DataTypes) {
    const Reminders = sequelize.define("reminders", {
        userID: DataTypes.INTEGER, 
        title: DataTypes.STRING, 
        content: DataTypes.STRING
    });
    return Reminders;
}