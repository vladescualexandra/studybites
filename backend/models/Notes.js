module.exports = function(sequelize, DataTypes) {
    const Notes = sequelize.define("notes", {
        userID: DataTypes.INTEGER, 
        bookID: DataTypes.INTEGER, 
        title: DataTypes.STRING, 
        content: DataTypes.TEXT
    });
    return Notes;
}