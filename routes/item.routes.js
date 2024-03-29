module.exports = app => {
    const items = require("../controllers/item.controller");
    const UserMiddleware = require("../middleware/user.middleware");

    var router = require("express").Router();
  
    router.post("/", UserMiddleware.admin, items.create);

    router.get("/", UserMiddleware.user, items.findAll);
};