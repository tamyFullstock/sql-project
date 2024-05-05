import  Comment  from "../models/commentDl.model.js";

const commentCrud = {};

// Create and Save a new comment
commentCrud.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a comment
  const comment = new Comment({
  postId : req.body.postId,
  name : req.body.name,
  email:req.body.email,
  body: req.body.body,
  });

  // Save comment in the database using the DL layer, then return the response object with status code and data the error is a data
  Comment.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the comment."
      });
    else res.send(data);
  });
};

// Retrieve all comments from the database (with condition).
//query effort us to filter records in db based on some conditions (same as query? title=?)
commentCrud.findAll = (req, res) => {
  const email = req.query.email;

  Comment.getAll(email, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    else res.send(data);
  });
};

// Find a single comment by Id
commentCrud.findOne = (req, res) => {
  Comment.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found comment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving comment with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a comment identified by the id in the request 
//to update url is like /:id
commentCrud.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);

  Comment.updateById(
    req.params.id,
    new Comment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found comment with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating comment with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a comment with the specified id in the request
//to delete url is like /:id

commentCrud.delete = (req, res) => {
  Comment.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found comment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete comment with id " + req.params.id
        });
      }
    } else res.send({ message: `comment was deleted successfully!` });
  });
};

// Delete all comments from the database.
commentCrud.deleteAll = (req, res) => {
  Comment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all comments."
      });
    else res.send({ message: `All comments were deleted successfully!` });
  });
};

export default commentCrud;