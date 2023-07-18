const dbConfig = require("../database/db.config.js");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.hr = require("./hr.model.js")(sequelize, Sequelize);
db.director = require("./directors.model.js")(sequelize, Sequelize);
db.employee = require("./employee.model.js")(sequelize, Sequelize);
db.org = require("./org.model.js")(sequelize, Sequelize);
db.attendance = require("./attendance.model.js")(sequelize, Sequelize);
db.leave = require("./leave.model.js")(sequelize, Sequelize);
db.department = require("./department.model.js")(sequelize, Sequelize);
db.job_title = require("./job_title.model.js")(sequelize, Sequelize);

// employee relationships

//employee belongs to one organisation 
db.employee.belongsTo(db.org, {
  foreignKey: {
    name: 'orgId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// many employees can be in one org
db.org.hasMany(db.employee, {
  foreignKey: {
    name: 'orgId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// employee belongs to one department
db.employee.belongsTo(db.department, {
  foreignKey: {
    name: 'departmentId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//many employees in one department
db.department.hasMany(db.employee, {
  foreignKey: {
    name: 'departmentId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//many employees have same job_title
db.job_title.hasMany(db.employee, {
  foreignKey: {
    name: 'jobId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//employee has one job title
db.employee.belongsTo(db.job_title, {
  foreignKey: {
    name: 'jobId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//employess have many attendance records
db.employee.hasMany(db.attendance, {
  foreignKey: {
    name: 'employeeId', // Foreign key column in Attendance table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//employees have many leave record
db.employee.hasMany(db.leave, {
  foreignKey: {
    name: 'employeeId', // Foreign key column in Leave table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//a leave record belongs to one employee
db.leave.belongsTo(db.employee, {
  foreignKey: {
    name: 'employeeId', // Foreign key column in Leave table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Hr has many employees
db.employee.belongsTo(db.hr, {
  foreignKey: {
    name: 'hrId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// many employees can be in one org
db.hr.hasMany(db.employee, {
  foreignKey: {
    name: 'hrId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//director has many employees
db.director.hasMany(db.employee,{
  foreignKey: {
    name: 'directorId',
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// employees belong to one director
db.employee.belongsTo(db.director, {
  foreignKey: {
    name: 'directorId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

db.hr.belongsTo(db.org, {
  foreignKey: {
    name: 'orgId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  as: 'organisation',
});

// many employees can be in one org
db.org.hasMany(db.hr, {
  foreignKey: {
    name: 'orgId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

db.hr.belongsTo(db.org, {
  foreignKey: {
    name: 'orgId', // Correct foreign key column in HR table for another org relationship
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  as: 'anotherOrg', // Alias for the association with another organization relationship (if needed)
});

db.hr.hasMany(db.attendance, {
  foreignKey: {
    name: 'hrId',
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  as: 'attendanceRecords'

});

db.attendance.belongsTo(db.hr, {
  foreignKey: {
    name: 'hrId', // Foreign key column in Attendance Record table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

db.hr.belongsTo(db.department, {
  foreignKey: {
    name: 'departmentId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//many hr in one department
db.department.hasMany(db.hr, {
  foreignKey: {
    name: 'departmentId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//many hr have same job_title
db.job_title.hasMany(db.hr, {
  foreignKey: {
    name: 'jobId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//hr has one job title
db.hr.belongsTo(db.job_title, {
  foreignKey: {
    name: 'jobId', // Foreign key column in Employee table
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

db.job_title.belongsTo(db.department,{
  foreignKey: {
    name: 'jobId',
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});



module.exports = db;
