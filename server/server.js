import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';
import session from 'express-session';
import userRoutes from "./app/routes/user.routes.js";
import postRoutes from './app/routes/post.routes.js';
import commentRoutes from './app/routes/comment.routes.js';
import todoRoutes from './app/routes/todo.routes.js';
import passwordRoutes from './app/routes/password.routes.js'
import loginRoute  from './app/routes/login.route.js';
import init from './app/routes/initialization.route.js';
import registerRoute from './app/routes/register.route.js';

const app = express();

//configuration of session to store details of the user login
app.use(session({
  secret : 'webslesson',
  resave : true,
  saveUninitialized : true
}));

//enable open the website from other websites
var corsOptions = {
  origin: "*"
}
app.use(cors(corsOptions))

//enable my program to get parameters as json not as strings!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//make the server know the routes to /api/user, /api/todos etc.
userRoutes(app);
postRoutes(app);
commentRoutes(app);
todoRoutes(app);
passwordRoutes(app);
loginRoute(app);
init(app);
registerRoute(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MySql application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
