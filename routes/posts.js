const express = require("express");

const postsController = require("../controllers/post.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

const router= express.Router(); //define my routes

//define router: where ("/") and method (callback funct)
// relative path w.r.t. that one defined into app.js
// because of we are using "express.Router()" 

//using middleware chechAuth in protected routes
router.post("/", checkAuthMiddleware.checkAuth, postsController.save);
router.get("/:id", postsController.show); //save id in params
router.get("/", postsController.showAll); 
router.patch("/:id", checkAuthMiddleware.checkAuth, postsController.update); //save id in params
router.delete("/:id", checkAuthMiddleware.checkAuth, postsController.destroy); //save id in params
//export
module.exports = router;