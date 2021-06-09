const express = require("express");
const controller = require("../controllers/users");
const passport = require("passport");
const router = express.Router();

router.get("/:id", passport.authenticate("jwt", { session: false } ), controller.getById);
router.patch("/:id", passport.authenticate("jwt", { session: false } ), controller.update);

module.exports = router;
