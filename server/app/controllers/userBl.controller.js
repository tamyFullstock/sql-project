import  User from "../models/userDl.model.js";

const userCrud = {};

// Create and Save a new user
userCrud.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a user
  const user = new User({
  name : req.body.name,
  username : req.body.username,
  email : req.body.email,
  address: req.body.address,
  phone: req.body.phone,
  website: req.body.website,
  copmany: req.body.company
  });

  // Save user in the database using the DL layer, then return the response object with status code and data the error is a data
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    else res.send(data);
  });
};

// Retrieve all users from the database (with condition).
//query effort us to filter records in db based on some conditions (same as query? username=?)
userCrud.findAll = (req, res) => {
  const username = req.query.username;

  User.getAll(username, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Find a single user by Id
userCrud.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.id
        });
        console.log(res);
      }
    } else res.send(data);
  });
};


// Update a user identified by the id in the request 
//to update url is like /:id
userCrud.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);

  User.updateById(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a user with the specified id in the request
//to delete url is like /:id

userCrud.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.id
        });
      }
    } else res.send({ message: `user was deleted successfully!` });
  });
};

// Delete all users from the database.
userCrud.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All users were deleted successfully!` });
  });
};


export default userCrud;
