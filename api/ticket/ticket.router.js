const router = require("express").Router();
const { validateToken } = require("../../auth/token_validation");
const {
  updateSubmittedStatus,
  updateConfirmedStatus,
} = require("./ticket.controller");

// @route api/ticket
router.put("/submit", validateToken, updateSubmittedStatus);
router.put("/confirm", validateToken, updateConfirmedStatus);

module.exports = router;
