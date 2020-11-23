module.exports = app => {
    const user = require("../controllers/user.controller");
    const UserMiddleware = require("../middleware/user.middleware");

    var router = require("express").Router();
  
    router.post("/", UserMiddleware.admin, user.create);


    router.post("/auth", user.authenticate);

    
    router.get("/", UserMiddleware.admin, user.findAll);


    router.get("/:id", UserMiddleware.user, user.findOne);
  

    router.delete("/", UserMiddleware.admin, user.deleteAll);


    router.delete("/:id", UserMiddleware.admin, user.delete);


    app.use('/api/users', router);
};