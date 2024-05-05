import  Password  from "../models/passwordDl.model.js"

const passwordCrud = {};

// Create and Save a new password
passwordCrud.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    console.log(req);
  }

  // Create a password
  const password = new Password({
  userId : req.body.userId,
  username : req.body.username,
  password: req.body.password,
  });

  // Save password in the database using the DL layer, then return the response object with status code and data the error is a data
  Password.create(password, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the password."
      });
    else res.send(data);
  });
};

// Retrieve all passwords from the database (with condition).
//query effort us to filter records in db based on some conditions (same as query? title=?)
passwordCrud.findAll = (req, res) => {
  const password = req.query.password;

  Password.getAll(password, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving passwords."
      });
    else res.send(data);
  });
};

// Find a single password by userId
passwordCrud.findOne = (req, res) => {
  Password.findById(req.params.userIdd, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found password with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving post with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};


// Update a password identified by the id in the request 
//to update url is like /:id
passwordCrud.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  console.log(req.params.id)
  Password.updateById(
    req.params.id,
    new Password(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found password with userId ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating password with userId " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a password with the specified id in the request
//to delete url is like /:id

passwordCrud.delete = (req, res) => {
  Password.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found password with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete password with id " + req.params.userId
        });
      }
    } else res.send({ message: `password was deleted successfully!` });
  });
};

// Delete all passwords from the database.
passwordCrud.deleteAll = (req, res) => {
  Password.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all passwords."
      });
    else res.send({ message: `All passwords were deleted successfully!` });
  });
};

export default passwordCrud;