import mysql from 'mysql2';
import con from "./connection.js"

const passwords=[
  {
      "userId":1,
      "username": "Bret",
      "password":"Sw12345"
  },
  {
      "userId":2,
      "username":"Antonette",
      "password":"qw55555"
  },
  {
      "userId":3,
      "username":"Samantha",
      "password":"Swq54b12345"
  },
  {
      "userId":4,
      "username":"Karianne",
      "password":"Gqwe3546"
  },
  {
      "userId":5,
      "username":"Kamren",
      "password":"Kqe3567"
  },
];

const createPasswordsTable= function(){
  con.connect(function(err) {
    if (err) throw err;
    //create table passwords:
    var sql = "CREATE TABLE IF NOT EXISTS passwords (userId INT , username VARCHAR(255), password VARCHAR(255) , FOREIGN KEY(userId) REFERENCES users(id))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("passwords table created");
    });
    //insert data into passwords table
    for (let i = 0; i< passwords.length; i++){
      var sql = `INSERT INTO passwords (userId,username, password) VALUES ('${passwords[i].userId}','${passwords[i].username}','${passwords[i].password}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(`${i} record inserted with id: ${result.insertId}`);
    });
    }
    //print all data in passwords table
    con.query("SELECT * FROM passwords", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });  
}

export default createPasswordsTable;
/*
con.connect(function(err) {
    if (err) throw err;
    var sql = "CREATE TABLE passwords (userId INT , username VARCHAR(255), password VARCHAR(255) , FOREIGN KEY(userId) REFERENCES users(id))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("passwords table created");
    });
  });


  
  

 

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    for (let i = 0; i< passwords.length; i++){
      var sql = `INSERT INTO passwords (userId,username, password) VALUES ('${passwords[i].userId}','${passwords[i].username}','${passwords[i].password}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(`${i} record inserted with id: ${result.insertId}`);
    });
    }
  });



 sql.connect(function(err) {
    if (err) throw err;
    sql.query("SELECT * FROM passwords", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });*/