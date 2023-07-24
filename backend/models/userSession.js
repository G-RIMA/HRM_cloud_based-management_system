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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
    return UserSession;
};

