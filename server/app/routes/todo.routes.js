import todos from '../controllers/todoBl.controller.js'
import express from 'express';

const todoRoute = app => {

  const router = express.Router();

  // Create a new todo
  router.post("/", todos.create);

  // Retrieve all todos
  router.get("/", todos.findAll);

  
  // Retrieve all published todos
  router.get("/completed", todos.findAllCompleted);

  // Retrieve a single todo with id
  router.get("/:id", todos.findOne);

  // Update a todo with id
  router.put("/:id", todos.update);

  // Delete a todo with id
  router.delete("/:id", todos.delete);

  // Delete all todo
  router.delete("/", todos.deleteAll);

  app.use('/api/todos', router);
};

export default todoRoute;