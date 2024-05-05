import  Todo  from "../models/todoDl.model.js";

const todoCrud = {};

// Create and Save a new todo
todoCrud.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a todo
  const todo = new Todo({
  userId : req.body.userId,
  title : req.body.title,
  completed: req.body.completed,
  });

  // Save todo in the database using the DL layer, then return the response object with status code and data the error is a data
  Todo.create(todo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the todo."
      });
    else res.send(data);
  });
};

// Retrieve all todos from the database (with condition).
//query effort us to filter records in db based on some conditions (same as query? title=?)
todoCrud.findAll = (req, res) => {
  const title = req.query.title;

  Todo.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todos."
      });
    else res.send(data);
  });
};

// Find a single todo by Id
todoCrud.findOne = (req, res) => {
  Todo.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found todo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving todo with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all completed todos
todoCrud.findAllCompleted = (req, res) => {
  Todo.getAllCompleted((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todos."
      });
    else res.send(data);
  });
};

// Update a todo identified by the id in the request 
//to update url is like /:id
todoCrud.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);

  Todo.updateById(
    req.params.id,
    new Todo(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found todo with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating todo with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a todo with the specified id in the request
//to delete url is like /:id

todoCrud.delete = (req, res) => {
  Todo.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found todo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete todo with id " + req.params.id
        });
      }
    } else res.send({ message: `todo was deleted successfully!` });
  });
};

// Delete all todo from the database.
todoCrud.deleteAll = (req, res) => {
  Todo.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all todos."
      });
    else res.send({ message: `All todos were deleted successfully!` });
  });
};

export default todoCrud;