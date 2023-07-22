const { DataTypes } = require('sequelize');
const sequelize = require('./index.js').sequelize
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const Hr = sequelize.define('HR', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        // Hash and salt the password before saving it to the database
        const hashedPassword = bcrypt.hashSync(value, 10); // The second argument is the saltRounds
        this.setDataValue('password', hashedPassword);
      },
    },
    wage: {
      type: DataTypes.INTEGER,
    },
    hr_type : {
      type: DataTypes.STRING,
    },
  });
   return Hr;
}

