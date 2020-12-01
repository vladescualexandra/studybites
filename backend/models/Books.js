module.exports = function(sequelize, DataTypes) {
    const Books = sequelize.define("books", {
        userID: DataTypes.INTEGER
    });
    return Books;
}