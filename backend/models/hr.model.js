
const sql = require("../database/database");

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
      console.log("Hr: ", res);
      result(null, res);
    });
  }

  static updateById(id, hr, result) {
    const queryParts = [];
    const values = [];
    const { first_name, last_name, email, password, hr_type } = hr;
      
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
    if (hr_type) {
      queryParts.push("hr_type = ?");
      values.push(hr_type);
    }
      
    if (queryParts.length === 0) {
      // No valid fields provided for update
      result({ kind: "bad_request" }, null);
      return;
    }
      
    const query = `UPDATE hr SET ${queryParts.join(", ")} WHERE id = ?`;
    values.push(id);
      
    sql.query(query, values, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      if (res.affectedRows === 0) {
        // No HR user found with the given ID
        result({ kind: "not_found" }, null);
        return;
      }
      
      console.log("updated hr: ", { id: id, ...hr });
      result(null, { id: id, ...hr });
    });
  }
    
  
  static remove(id, result) {
    sql.query("DELETE FROM hr WHERE id = ?", id, (err, res) => {
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
        
        console.log("deleted hr with id: ", id);
        result(null, res);
    });
  };
}


module.exports = Hr;

  

