const {
  updateSubmittedStatus,
  updateConfirmedStatus,
} = require("./ticket.service");

module.exports = {
  updateSubmittedStatus: (req, res) => {
    const body = req.body;

    updateSubmittedStatus(body, (err, results) => {
      if (err) {
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  updateConfirmedStatus: (req, res) => {
    const body = req.body;

    updateConfirmedStatus(body, (err, results) => {
      if (err) {
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
