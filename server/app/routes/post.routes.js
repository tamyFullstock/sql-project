import posts from '../controllers/postBl.controller.js'
import express from 'express';

const postRoute = app => {

  const router = express.Router();

  // Create a new post
  router.post("/", posts.create);

  // Retrieve all posts
  router.get("/", posts.findAll);

  // Retrieve a single post with id
  router.get("/:id", posts.findOne);

  // Update a post with id
  router.put("/:id", posts.update);

  // Delete a post with id
  router.delete("/:id", posts.delete);

  // Delete all posts
  router.delete("/", posts.deleteAll);

  app.use('/api/posts', router);
};

export default postRoute;