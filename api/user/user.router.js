const router = require("express").Router();
const { createUser, login, getUserSubmitted } = require("./user.controller");
const { validateToken } = require("../../auth/token_validation");

// @route api/user
router.post("/", createUser);
router.post("/login", login);
router.get("/", validateToken, getUserSubmitted);

module.exports = router;
