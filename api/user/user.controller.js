const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const {
  createUser,
  getUserByEmail,
  getTicketInformation,
  getUserSubmitted,
} = require("./user.service");
const { sign } = require("jsonwebtoken");

module.exports = {
  // registration function
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
  // login function
  login: (req, res) => {
    const body = req.body;

    getUserByEmail(body, (err, results) => {
      if (err) {
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
      }
      if (!results) {
        return res.status(401).json({
          success: 0,
          message: "Email tidak terdaftar.",
        });
      }

      const result = compareSync(body.password, results.password);

      if (result) {
        results.password = undefined;
        const token = sign({ result: results }, process.env.SECRET_KEY, {
          expiresIn: process.env.EXPIRED_TOKEN,
        });

        getTicketInformation({ ticketId: results.ticket_id }, (err, ticket) => {
          if (err) {
            process.env.NODE_ENV === "development" ? console.log(err) : void 0;
            return res.status(500).json({
              success: 0,
              message: err.message,
            });
          }

          results.ticket = ticket;

          return res.status(200).json({
            success: 1,
            message: "Berhasil login",
            token,
            data: results,
          });
        });
      } else {
        return res.status(401).json({
          success: 0,
          message: "Password tidak sesuai.",
        });
      }
    });
  },
  // get all user submitted from admin side
  getUserSubmitted: (req, res) => {
    getUserSubmitted((err, results) => {
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
