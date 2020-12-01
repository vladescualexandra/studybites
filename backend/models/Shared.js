module.exports = function(sequelize, DataTypes) {
    const Shared = sequelize.define("shared", {
        title: DataTypes.STRING, 
        content: DataTypes.TEXT
    });
    return Shared;
}