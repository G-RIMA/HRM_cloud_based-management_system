const { DataTypes } = require('sequelize');
const sequelize = require('./index.js').sequelize

module.exports = (sequelize, Sequelize) => {
  const org = sequelize.define('Org', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    org_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
   return org;
}