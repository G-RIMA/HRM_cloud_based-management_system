const { DataTypes } = require('sequelize');
const sequelize = require('./index.js').sequelize

module.exports = (sequelize, Sequelize) => {
  const leave = sequelize.define('leave', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    leave_start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    leave_end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    no_of_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type_of_leave: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    response: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });
   return leave;
}