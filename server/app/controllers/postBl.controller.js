import  Post  from "../models/postDl.model.js";


const postCrud = {};

// Create and Save a new post
postCrud.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    console.log(req);
  }

  // Create a post
  const post = new Post({
  userId : req.body.userId,
  title : req.body.title,
  body: req.body.body,
  });

  // Save post in the database using the DL layer, then return the response object with status code and data the error is a data
  Post.create(post, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the post."
      });
    else res.send(data);
  });
};

// Retrieve all posts from the database (with condition).
//query effort us to filter records in db based on some conditions (same as query? title=?)
postCrud.findAll = (req, res) => {
  const title = req.query.title;

  Post.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    else res.send(data);
  });
};

// Find a single post by Id
postCrud.findOne = (req, res) => {
  Post.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found post with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving post with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a post identified by the id in the request 
//to update url is like /:id
postCrud.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);

  Post.updateById(
    req.params.id,
    new Post(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found post with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating post with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a post with the specified id in the request
//to delete url is like /:id

postCrud.delete = (req, res) => {
  Post.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found post with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete post with id " + req.params.id
        });
      }
    } else res.send({ message: `post was deleted successfully!` });
  });
};

// Delete all posts from the database.
postCrud.deleteAll = (req, res) => {
  Post.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all posts."
      });
    else res.send({ message: `All posts were deleted successfully!` });
  });
};

export default postCrud;