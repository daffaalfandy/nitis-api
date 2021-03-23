const router = require("express").Router();
const { createUser, login } = require("./user.controller");

// @route api/user
router.post("/", createUser);
router.post("/login", login);

module.exports = router;
