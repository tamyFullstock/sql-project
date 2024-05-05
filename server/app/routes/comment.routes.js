import comments from '../controllers/commentBl.controller.js'
import express from 'express';

const commentRoute = app => {

  const router = express.Router();

  // Create a new comment
  router.post("/", comments.create);

  // Retrieve all comments
  router.get("/", comments.findAll);

  // Retrieve a single comment with id
  router.get("/:id", comments.findOne);

  // Update a comment with id
  router.put("/:id", comments.update);

  // Delete a comment with id
  router.delete("/:id", comments.delete);

  // Delete all comments
  router.delete("/", comments.deleteAll);

  app.use('/api/comments', router);
};

export default commentRoute;