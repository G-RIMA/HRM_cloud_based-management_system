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
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    contact: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
   return org;
}