const router = require("express").Router();
const { createUser } = require("./user.controller");

// @route api/user
router.post("/", createUser);

module.exports = router;
