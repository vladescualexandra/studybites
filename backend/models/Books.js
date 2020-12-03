module.exports = function(sequelize, DataTypes) {
    const Books = sequelize.define("books", {
        userID: DataTypes.INTEGER,
        name: DataTypes.STRING
    });
    return Books;
}