import mysql from 'mysql2';
import con from "./connection.js"

const comments=[
    {
        "postId": 1,
        "id": 1,
        "name": "id labore ex et quam laborum",
        "email": "Eliseo@gardner.biz",
        "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    },
    {
        "postId": 1,
        "id": 2,
        "name": "quo vero reiciendis velit similique earum",
        "email": "Jayne_Kuhic@sydney.com",
        "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
    },
    {
        "postId": 2,
        "id": 7,
        "name": "repellat consequatur praesentium vel minus molestias voluptatum",
        "email": "Dallas@ole.me",
        "body": "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor"
    },
    {
        "postId": 2,
        "id": 8,
        "name": "et omnis dolorem",
        "email": "Mallory_Kunze@marie.org",
        "body": "ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque"
    },
    {
        "postId": 3,
        "id": 12,
        "name": "modi ut eos dolores illum nam dolor",
        "email": "Oswald.Vandervort@leanne.org",
        "body": "expedita maiores dignissimos facilis\nipsum est rem est fugit velit sequi\neum odio dolores dolor totam\noccaecati ratione eius rem velit"
    },
    {
        "postId": 3,
        "id": 14,
        "name": "et officiis id praesentium hic aut ipsa dolorem repudiandae",
        "email": "Nathan@solon.io",
        "body": "vel quae voluptas qui exercitationem\nvoluptatibus unde sed\nminima et qui ipsam aspernatur\nexpedita magnam laudantium et et quaerat ut qui dolorum"
    },
    {
        "postId": 14,
        "id": 17,
        "name": "eos est animi quis",
        "email": "Preston_Hudson@blaise.tv",
        "body": "consequatur necessitatibus totam sed sit dolorum\nrecusandae quae odio excepturi voluptatum harum voluptas\nquisquam sit ad eveniet delectus\ndoloribus odio qui non labore" 
    },
    {
        "postId": 21,
        "id": 20,
        "name": "molestias expedita iste aliquid voluptates",
        "email": "Mariana_Orn@preston.org",
        "body": "qui harum consequatur fugiat\net eligendi perferendis at molestiae commodi ducimus\ndoloremque asperiores numquam qui\nut sit dignissimos reprehenderit tempore"
    }
  ];

const createCommentsTable = function(){
  con.connect(function(err) {
    if (err) throw err;
    //create a table comments
    var sql = `CREATE TABLE IF NOT EXISTS comments (postId INT, id INT PRIMARY KEY AUTO_INCREMENT ,name VARCHAR(255) ,email VARCHAR(255),body VARCHAR(255),  FOREIGN KEY(postId) REFERENCES posts(id))`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Comments table created");
    });
    //insert comments to the table
    for (let i = 0; i< comments.length; i++){
      var sql = `INSERT INTO comments (postId,id, name, email,body) VALUES ('${comments[i].postId}','${comments[i].id}','${comments[i].name}','${comments[i].email}','${comments[i].body}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(`${i} record inserted with id: ${result.insertId}`);
    });
    }
    //print the table
    con.query("SELECT * FROM comments", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
}

export default createCommentsTable;

  /*
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    for (let i = 0; i< comments.length; i++){
      var sql = `INSERT INTO comments (postId,id, name, email,body) VALUES ('${comments[i].postId}','${comments[i].id}','${comments[i].name}','${comments[i].email}','${comments[i].body}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(`${i} record inserted with id: ${result.insertId}`);
    });
    }
  });

   /* con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM posts", function (err, result, fields) {
      if (err) throw err;
      console.log(res ult);
    });
  });*/