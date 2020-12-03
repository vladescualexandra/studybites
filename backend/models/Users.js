module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define('users', {
       name: {
           type: DataTypes.STRING, 
           allowNull: false,    
       },
       email: {
           type: DataTypes.STRING, 
           allowNull: false, 
           unique: true
       },
       password: {
           type: DataTypes.STRING, 
           allowNull: false
       },
    });
    return Users;
}