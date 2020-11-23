const db = require("../models");
const Item = db.item;
const Op = db.Sequelize.Op;

// Create and Save a new Items
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Items
  const item = {
    title: req.body.title,
    description: req.body.description
  };

  // Save Items in the database
  Item.create(item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Items."
      });
    });
};

// Retrieve all Itemss from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Item.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Itemss."
        });
      });
};

// Find a single Items with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Item.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Items with id=" + id
        });
    });
};


// Delete a Items with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Item.destroy({
      where: { id: id }
    })
    .then(num => {
        res.send({
        message: "Items was deleted successfully!"
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Items with id=" + id
        });
    });
};


exports.deleteAll = (req, res) => {
    Item.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Items were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all Items."
        });
    });
};
