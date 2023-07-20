const { DataTypes } = require('sequelize');
const sequelize = require('./index.js').sequelize

module.exports = (sequelize, Sequelize) => {
  const department = sequelize.define('department', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dep_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
   return department;
}