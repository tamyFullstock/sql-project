import mysql from 'mysql2';
import con from "./connection.js"
import createDB from "./createMyDB.js"
import createUsersTable from "./createUsersTable.js"
import createCommentsTable from "./createCommentsTable.js";
import createPasswordsTable from "./createPasswordsTable.js";
import createPostsTable from "./createPostsTable.js";
import createTodosTable from "./createTodosTable.js";
import clearDBTables from "./clearDB.js";


//initialize the DB and its tables.
const initialization = async function(result) {

  try {
    await createDB();
    await clearDBTables();
    await createUsersTable();
    await createPasswordsTable();
    await createPostsTable();
    await createCommentsTable();
    await createTodosTable();
    console.log("Database and tables created successfully.")
    result(null, "Database and tables created successfully");
    // Call other functions in the desired order
  } catch (error) {
    console.error('Initialization error:', error);
    result(err, null);
  }
}

export default initialization;