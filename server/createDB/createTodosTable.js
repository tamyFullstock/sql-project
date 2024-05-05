import mysql from 'mysql2';
import con from "./connection.js"

/*con.connect(function(err) {
    if (err) throw err;
    var sql = `CREATE TABLE todos (userId INT, id INT PRIMARY KEY AUTO_INCREMENT ,title VARCHAR(255) ,completed BOOLEAN, FOREIGN KEY(userId) REFERENCES users(id))`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Todos table created");
    });
  });*/

const todos=[
    {
        "userId": 2,
        "id": 1,
        "title": "delectus aut autem",
        "completed": 0
    },
    
    {
        "userId": 2,
        "id": 22,
        "title": "distinctio vitae autem nihil ut molestias quo",
        "completed": 1
    },
   
    {
        "userId": 3,
        "id": 46,
        "title": "vel voluptatem repellat nihil placeat corporis",
        "completed": 0
    },
   
    {
        "userId": 4,
        "id": 61,
        "title": "odit optio omnis qui sunt",
        "completed": 1
    },
   
];

const createTodosTable = function(){
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //create table todos
    var sql = `CREATE TABLE IF NOT EXISTS todos (userId INT, id INT PRIMARY KEY AUTO_INCREMENT ,title VARCHAR(255) ,completed BOOLEAN, FOREIGN KEY(userId) REFERENCES users(id))`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Todos table created");
    });
    //insert data into todos table
    for (let i = 0; i< todos.length; i++){
      var sql = `INSERT INTO todos (userId,id, title, completed) VALUES ('${todos[i].userId}','${todos[i].id}','${todos[i].title}','${todos[i].completed}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(`${i} record inserted with id: ${result.insertId}`);
    });
    }
    //print all data from todos table
    con.query("SELECT * FROM todos", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
}

export default createTodosTable;

  