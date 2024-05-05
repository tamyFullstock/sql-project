import mysql from 'mysql2';
import con from "./connection.js"

const clearDBTables = function(){
    con.connect(function(err) {
      if (err) throw err;
      con.query("drop table if exists todos", function (err, result, fields) {
        if (err) throw err;
        console.log("(deleted todos table successfully");
      });
      con.query("drop table if exists comments", function (err, result, fields) {
        if (err) throw err;
        console.log("(deleted comments table successfully");
      });
      con.query("drop table if exists posts", function (err, result, fields) {
        if (err) throw err;
        console.log("(deleted posts table successfully");
      });
      con.query("drop table if exists passwords", function (err, result, fields) {
        if (err) throw err;
        console.log("(deleted  passwords table successfully");
      });
      con.query("drop table if exists users", function (err, result, fields) {
        if (err) throw err;
        console.log("(deleted users table successfully");
      });
    });
}

export default clearDBTables;