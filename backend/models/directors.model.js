
const sql = require("../database/database");

class Director{
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

      console.log("director created: ", { id: res.insertId, ...newDirector });
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
      console.log("Director: ", res);
      result(null, res);
    });
  }

  static updateById(id, director, result) {
    const queryParts = [];
    const values = [];
    const { first_name, last_name, email, password } = director;
      
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
      
    const query = `UPDATE director SET ${queryParts.join(", ")} WHERE id = ?`;
    values.push(id);
      
    sql.query(query, values, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      if (res.affectedRows === 0) {
        // No director user found with the given ID
        result({ kind: "not_found" }, null);
        return;
      }
      
      console.log("updated director: ", { id: id, ...director });
      result(null, { id: id, ...director });
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


module.exports = Director;
