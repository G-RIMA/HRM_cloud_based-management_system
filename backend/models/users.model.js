
const sql = require("../database/database");

class Employees {
    constructor(employees) {
        this.first_name = employees.first_name;
        this.last_name = employees.last_name;
        this.email = employees.email;
        this.password = employees.password;
        this.department = employees.department;
        this.job_title = employees.job_title;
    }
    static create(newEmployee, result) {
        sql.query("INSERT INTO employees SET ?", newEmployee, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
      
            console.log("employee created: ", { id: res.insertId, ...newEmployee });
            result(null, { id: res.insertId, ...newEmployee });
          });

    }

    static getAll(email, result) {
        let query = "SELECT * FROM employees";
        
        if (email) {
            query += ` WHERE email LIKE '%${email}%'`;
        }
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            
            console.log("email: ", res);
            result(null, res);
        });
    }

    static updateById(id, employees, result) {
        let query = "SELECT * FROM employees";

        if (email) {
            query += ` WHERE email LIKE '%${email}%'`;
        }
        
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("email: ", res);
            result(null, res);
        }); 

    }

    static remove(id, result) {
        sql.query("DELETE FROM employees WHERE id = ?", id, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
          }
      
          console.log("deleted director with id: ", id);
          result(null, res);
        });
      };
    
}

class Hr{
  constructor(hr) {
    this.first_name = hr.first_name;
    this.last_name = hr.last_name;
    this.email = hr.email;
    this.password = hr.password;
    this.hr_type = hr.hr_type;
  }

  static create(newHr, result) {
    sql.query("INSERT INTO hr SET ?", newHr, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("hr created: ", { id: res.insertId, ...newHr });
      result(null, { id: res.insertId, ...newHr });
    });
  }

  static getAll(email, result) {
    let query = "SELECT * FROM hr";

    if (email) {
      query += ` WHERE email LIKE '%${email}%'`;
    }

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("email: ", res);
      result(null, res);
    });
  }

  static updateById(id, hr, result) {
    let query = "SELECT * FROM hr";

    if (email) {
      query += ` WHERE email LIKE '%${email}%'`;
    }

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("email: ", res);
      result(null, res);
    });
  }
  
  static remove(id, result) {
    sql.query("DELETE FROM employees WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("deleted tutorial with id: ", id);
        result(null, res);
    });
  };
}

class Director {
    constructor(director) {
        this.first_name = director.first_name;
        this.last_name = director.last_name;
        this.email = director.email;
        this.password = director.password;
    }
  
    static create(newDirector, result) {
        sql.query("INSERT INTO director SET ?", newDirector, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            
            console.log("hr created: ", { id: res.insertId, ...newHr });
            result(null, { id: res.insertId, ...newDirector });
        });
    }

    static getAll(email, result) {
        let query = "SELECT * FROM director";
    
        if (email) {
          query += ` WHERE email LIKE '%${email}%'`;
        }
    
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("email: ", res);
            result(null, res);
        });
    }

    static updateById(id, director, result) {
        let query = "SELECT * FROM director";
        if (email) {
            query += ` WHERE email LIKE '%${email}%'`;
        }
        
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            
            console.log("email: ", res);
            result(null, res);
        });
    }

    static remove(id, result) {
        sql.query("DELETE FROM director WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }
            
            console.log("deleted director with id: ", id);
            result(null, res);
        });
    };

}

   

class AttendanceRecord {
    constructor(record) {
        this.check_in = record.check_in;
        this.check_out = record.check_out;
    }
  
    static create(record, result) {
        sql.query("INSERT INTO attendance_record SET ?", record, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            
            console.log("Record created: ", { id: res.insertId, ...record });
            result(null, { id: res.insertId, ...record });
        });

    }
  
    static getAll(result) { 
        let query = "SELECT * FROM attendance_records";
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("attendance records: ", res);
            result(null, res);
        });

    }
  
    static updateById(id, record, result) {
        // Specific logic for updating an attendance record
        const { field1, field2, field3 } = record;
        const query = "UPDATE attendance_records SET field1 = ?, field2 = ?, field3 = ? WHERE id = ?";
        const values = [field1, field2, field3, id];
        
        sql.query(query, values, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows === 0) {
                // No attendance record found with the given ID
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated attendance record: ", { id: id, ...record });
            result(null, { id: id, ...record });
        });
    }
}

class LeaveRequest {
    constructor(request) {
        this.start_date = request.start_date;
        this.end_date = request.end_date;
        this.status = request.status;
    }
    
    static create(request, result) {
        sql.query("INSERT INTO leave_request SET ?", request, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
      
            console.log("Leave request created: ", { id: res.insertId, ...request });
            result(null, { id: res.insertId, ...request });
        });
    }
  
    static getAll(result) {
        // Specific logic for retrieving leave requests
        let query = "SELECT * FROM leave_requests";
      
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("leave records: ", res);
            result(null, res);
        });
    }
  
    static updateById(id, request, result) {
        // Specific logic for updating a leave request
        const { field1, field2, field3 } = record;
        const query = "UPDATE leave_records SET field1 = ?, field2 = ?, field3 = ? WHERE id = ?";
        const values = [field1, field2, field3, id];
        
        sql.query(query, values, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows === 0) {
                // No attendance record found with the given ID
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated leave record: ", { id: id, ...record });
            result(null, { id: id, ...record });
        });
    }
}

module.exports = {
    Employees,
    Hr,
    Director,
    AttendanceRecord,
    LeaveRequest,
};

  

