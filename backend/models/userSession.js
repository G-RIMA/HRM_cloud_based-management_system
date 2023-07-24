// models/userSession.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index.js').sequelize;


module.exports = (sequelize, Sequelize)=>{
    const UserSession = sequelize.define('UserSession', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
    return UserSession;
};

