const express = require("express");
const controller = require("../controllers/books");
const passport = require("passport");
const router = express.Router();

router.get("/", controller.getAll);
router.get("/pagination", controller.getSeveral)
router.get("/:id", controller.getById);
router.delete("/:id", passport.authenticate("jwt", { session: false } ),  controller.delete);
router.post("/", passport.authenticate("jwt", { session: false } ), controller.create);
router.patch("/:id", passport.authenticate("jwt", { session: false } ), controller.update);

module.exports = router;
