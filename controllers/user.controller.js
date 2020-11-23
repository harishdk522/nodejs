const db = require("../models");
const User = db.user;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password || !req.body.role) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
    });
};


// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
      where: { id: id }
    })
    .then(num => {
        res.send({
        message: "User was deleted successfully!"
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
};


exports.deleteAll = (req, res) => {
    User.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all Users."
        });
    });
};


exports.authenticate = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  User.findOne({ where: { username: req.body.username, password : req.body.password } })
  .then(data => {
      res.send({role: data.role});
  })
  .catch(err => {
    console.error(err);
    res.status(500).send({
      message: "Error retrieving Items with given credentials"
    });
  });
};