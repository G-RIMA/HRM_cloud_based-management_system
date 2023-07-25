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
      type: DataTypes.TIME,
      allowNull: true, // Allow null to indicate not checked-in yet
    },
    check_out: {
      type: DataTypes.TIME,
      allowNull: true, // Allow null to indicate not checked-out yet
    },
    lunch_check_in: {
      type: DataTypes.TIME,
      allowNull: true, // Allow null to indicate not checked-in for lunch yet
    },
    lunch_check_out: {
      type: DataTypes.TIME,
      allowNull: true, // Allow null to indicate not checked-out for lunch yet
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Additional fields for reporting and analytics
    
  });

  return Attendance;
};
