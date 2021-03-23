const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { createUser } = require("./user.service");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);

    body.password = hashSync(body.password, salt);

    createUser(body, (err, results) => {
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
