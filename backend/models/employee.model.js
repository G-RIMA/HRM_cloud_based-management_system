
const sql = require("../database/database");

class Employee{
  constructor(employee) {
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.email = employee.email;
    this.password = employee.password;

  }

  static create(newEmployee, result) {
    sql.query("INSERT INTO employees SET ?", newEmployee, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Employee created: ", { id: res.insertId, ...newEmployee });
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
      console.log("Employee: ", res);
      result(null, res);
    });
  }

  static updateById(id, employee, result) {
    const queryParts = [];
    const values = [];
    const { first_name, last_name, email, password } = employee;
      
    if (first_name) {
      queryParts.push("first_name = ?");
      values.push(first_name);
    }
    if (last_name) {
      queryParts.push("last_name = ?");
      values.push(last_name);
    }
    if (email) {
      queryParts.push("email = ?");
      values.push(email);
    }
    if (password) {
      queryParts.push("password = ?");
      values.push(password);
    }

    if (queryParts.length === 0) {
      // No valid fields provided for update
      result({ kind: "bad_request" }, null);
      return;
    }
      
    const query = `UPDATE employees SET ${queryParts.join(", ")} WHERE id = ?`;
    values.push(id);
      
    sql.query(query, values, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      if (res.affectedRows === 0) {
        // No employee user found with the given ID
        result({ kind: "not_found" }, null);
        return;
      }
      
      console.log("updated employee: ", { id: id, ...employee });
      result(null, { id: id, ...employee });
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
        
        console.log("deleted employee with id: ", id);
        result(null, res);
    });
  };
}


module.exports = Employee;