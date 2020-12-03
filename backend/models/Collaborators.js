module.exports = function(sequelize, DataTypes) {
    const Collaborators = sequelize.define("collaborators", {
        sharedId: DataTypes.INTEGER, 
        userId: DataTypes.INTEGER
    });
    return Collaborators;
}