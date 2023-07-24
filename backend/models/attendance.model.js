const { DataTypes } = require('sequelize');
const sequelize = require('./index.js').sequelize

module.exports = (sequelize, Sequelize) => {
  const Attendance = sequelize.define('attendance_records', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    check_in: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    check_out: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    lunch_check_in: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    lunch_check_out: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Additional fields for reporting and analytics
    total_working_hours: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: '00:00:00',
    },
    overtime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: '00:00:00',
    },
    late_arrivals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    early_departures: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return Attendance;
};