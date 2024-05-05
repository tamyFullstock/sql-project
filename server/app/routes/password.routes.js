import passwords from '../controllers/passwordBl.controller.js'
import express from 'express';

const passwordRoute = app => {

  const router = express.Router();

  // Create a new password
  router.post("/", passwords.create);

  // Retrieve all password
  router.get("/", passwords.findAll);

  // Retrieve a single password with userId
  router.get("/:id", passwords.findOne);

  // Update a password with userId
  router.put("/:id", passwords.update);

  // Delete a password with userId
  router.delete("/:id", passwords.delete);

  // Delete all passwords
  router.delete("/", passwords.deleteAll);

  app.use('/api/passwords', router);
};

export default  passwordRoute ;