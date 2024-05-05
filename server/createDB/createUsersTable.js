import mysql from 'mysql2';
import con from "./connection.js"

const users =[
  {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": "Kulas Light Apt. 556 Gwenborough",
      "phone": 547865011,
      "website": "hildegard.org",
      "company": "Romaguera-Crona"
  },

  {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": "Victor Plains Suite 879,Wisokyburgh",
      "phone": 521457655,
      "website": "anastasia.net",
      "company": "Deckow-Crist"
  },
  {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",
      "address":  "Douglas Extension,Suite 847 ,McKenziehaven",
      "phone": 508475122,
      "website": "ramiro.info",
      "company": "Romaguera-Jacobson"    
  },
  {
      "id": 4,
      "name": "Patricia Lebsack",
      "username": "Karianne",
      "email": "Julianne.OConner@kory.org",
      "address":  "Hoeger Mall Apt. 692 ,South Elvis",
      "phone": 545871245,
      "website": "kale.biz",
      "company": "Robel-Corkery"
  },
  {
      "id": 5,
      "name": "Chelsey Dietrich",
      "username": "Kamren",
      "email": "Lucio_Hettinger@annie.ca",
      "address":"Skiles Walks,Suite 351 ,Roscoeview",
      "phone": 558741754,
      "website": "demarco.info",
      "company": "Keebler LLC"
  }
];

const createUsersTable = function(){
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //create a tabkle "user"
    var sql = "CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(255) ,username VARCHAR(255) ,email VARCHAR(255), address VARCHAR(255), phone INT(30), website VARCHAR(255) , company VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Users table created");
    });
    //insert users to the table
    for (let i = 0; i< users.length; i++){
      sql = `INSERT INTO users (id,name, username, email, address, phone, website, company) VALUES ('${users[i].id}','${users[i].name}','${users[i].username}','${users[i].email}','${users[i].address}','${users[i].phone}','${users[i].website}','${users[i].company}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(`${i} record inserted with id: ${result.insertId}`);
    });
    }
    //console log the users
    con.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
});
}

export default createUsersTable;

 
/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    for (let i = 0; i< users.length; i++){
      var sql = `INSERT INTO users (id,name, username, email, address, phone, website, company) VALUES ('${users[i].id}','${users[i].name}','${users[i].username}','${users[i].email}','${users[i].address}','${users[i].phone}','${users[i].website}','${users[i].company}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(`${i} record inserted with id: ${result.insertId}`);
    });
    }
  });*/

 /* con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });*/
