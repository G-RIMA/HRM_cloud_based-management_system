const { DataTypes } = require('sequelize');
const sequelize = require('./index.js').sequelize

module.exports = (sequelize, Sequelize) => {
  const Attendance = sequelize.define('attendance_records', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    check_in: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    check_out: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lunch_check_in: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lunch_check_out: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_time: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  });
   return Attendance;
}