
const sql = require("../database/database");

class Org{
  constructor(org) {
    this.name = org.name;
    this.address = org.address;
    this.email = org.email;
    this.contact_number = org.contact_number;
  }

  static create(newOrg, result) {
    sql.query("INSERT INTO organizations SET ?", newOrg, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("org created: ", { id: res.insertId, ...newOrg });
      result(null, { id: res.insertId, ...newOrg });
    });
  }

  static getAll(email, result) {
    let query = "SELECT * FROM organizations";

    if (email) {
      query += ` WHERE email LIKE '%${email}%'`;
    }

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Organization: ", res);
      result(null, res);
    });
  }

  static updateById(id, org, result) {
    const queryParts = [];
    const values = [];
    const { name, address, email, contact_number } = org;
      
    if (name) {
      queryParts.push("name = ?");
      values.push(first_name);
    }
    if (address) {
      queryParts.push("address = ?");
      values.push(address);
    }
    if (email) {
      queryParts.push("email = ?");
      values.push(email);
    }
    if (contact_number) {
      queryParts.push("contact_number = ?");
      values.push(password);
    }
      
    if (queryParts.length === 0) {
      // No valid fields provided for update
      result({ kind: "bad_request" }, null);
      return;
    }
      
    const query = `UPDATE organizations SET ${queryParts.join(", ")} WHERE id = ?`;
    values.push(id);
      
    sql.query(query, values, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      if (res.affectedRows === 0) {
        // No org  found with the given ID
        result({ kind: "not_found" }, null);
        return;
      }
      
      console.log("updated org: ", { id: id, ...org });
      result(null, { id: id, ...org });
    });
  }
    
  
  static remove(id, result) {
    sql.query("DELETE FROM organizations WHERE id = ?", id, (err, res) => {
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
        
        console.log("deleted organization with id: ", id);
        result(null, res);
    });
  };
}


module.exports = Org;
