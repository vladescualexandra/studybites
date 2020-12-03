module.exports = function(sequelize, DataTypes) {
    const Shared = sequelize.define("shareds", {
        title: DataTypes.STRING, 
        content: DataTypes.TEXT
    });
    return Shared;
}