import mysql from 'mysql2';

var con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'tamy0549882!',
});

const createDB = function(){
  //create database
  con.connect(function(err) {
    if (err) throw err;
    con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });
}

export default createDB;
