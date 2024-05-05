import mysql from 'mysql2';
import con from "./connection.js"

const posts=[
  {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
      "userId": 1,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
      "userId": 1,
      "id": 3,
      "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
      "userId": 2,
      "id": 13,
      "title": "dolorum ut in voluptas mollitia et saepe quo animi",
      "body": "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam"
  },
  {
      "userId": 2,
      "id": 14,
      "title": "voluptatem eligendi optio",
      "body": "fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum" 
  },
  {
      "userId": 3,
      "id": 21,
      "title": "asperiores ea ipsam voluptatibus modi minima quia sint",
      "body": "repellat aliquid praesentium dolorem quo\nsed totam minus non itaque\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\ntempora et tenetur expedita sunt"
  },
  {
      "userId": 4,
      "id": 31,
      "title": "ullam ut quidem id aut vel consequuntur",
      "body": "debitis eius sed quibusdam non quis consectetur vitae\nimpedit ut qui consequatur sed aut in\nquidem sit nostrum et maiores adipisci atque\nquaerat voluptatem adipisci repudiandae"
  },
  {
      "userId": 4,
      "id": 32,
      "title": "doloremque illum aliquid sunt",
      "body": "deserunt eos nobis asperiores et hic\nest debitis repellat molestiae optio\nnihil ratione ut eos beatae quibusdam distinctio maiores\nearum voluptates et aut adipisci ea maiores voluptas maxime"
  }
];

const createPostsTable = function(){
  con.connect(function(err) {
    if (err) throw err;
    //create table post
    var sql = `CREATE TABLE IF NOT EXISTS posts (userId INT, id INT PRIMARY KEY AUTO_INCREMENT ,title VARCHAR(255) ,body VARCHAR(255), FOREIGN KEY(userId) REFERENCES users(id))`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Posts table created");
    });
    //insert data into table post
    for (let i = 0; i< posts.length; i++){
      var sql = `INSERT INTO posts (userId,id, title, body) VALUES ('${posts[i].userId}','${posts[i].id}','${posts[i].title}','${posts[i].body}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(`${i} record inserted with id: ${result.insertId}`);
    });
    }
    //print all data from table post
    con.query("SELECT * FROM posts", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
}

export default createPostsTable;
/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    for (let i = 0; i< posts.length; i++){
      var sql = `INSERT INTO posts (userId,id, title, body) VALUES ('${posts[i].userId}','${posts[i].id}','${posts[i].title}','${posts[i].body}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(`${i} record inserted with id: ${result.insertId}`);
    });
    }
  });

  /*con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM posts", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });*/