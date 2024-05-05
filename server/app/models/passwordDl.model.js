import sql from './db.js';

// constructor
class Password {
  constructor(password) {
    // Check if user object is provided
    if (password) {
      this.userId = password.userId; 
      this.username = password.username;
      this.password= password.password;
    }
  }
}

//result is a callback func with 2 params : err, data if there is an error it will return the error and put null on data' else will put null on the error and enter the new data to the data
Password.create = (newPassword, result) => {
  sql.query("INSERT INTO passwords SET ?", newPassword, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created password: ", newPassword );
    result(null, newPassword );
  });
};

Password.findById = (userId, result) => {
  sql.query(`SELECT * FROM passwords WHERE userId = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found password: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found password with the userId
    result({ kind: "not_found" }, null);
  });
};

Password.getAll = (password, result) => {
  let query = "SELECT * FROM passwords";

  if (password) {
    query += ` WHERE password LIKE '%${password}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("passwords: ", res);
    result(null, res);
  });
};

Password.updateById = (userId, password, result) => {
  sql.query(
    "UPDATE passwords SET  userId = ?, username = ?,password=?  WHERE userId = ?",
    [ password.userId, password.username, password.password, userId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      //res includes param according to the result, one of them is affectedRows  which means how many rows were changed in database if the value is 0 that means that no rows been effected
      if (res.affectedRows == 0) {
        // not found todo with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated password: ", { ...password });
      result(null, { ...password });
    }
  );
};

Password.remove = (userId, result) => {
  sql.query("DELETE FROM passwords WHERE id = ?", userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found password with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted password with id: ", id);
    result(null, res);
  });
};

Password.removeAll = result => {
  sql.query("DELETE FROM passwords", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} passwords`);
    result(null, res);
  });
};

export default Password;