const pool = require("../../config/database");

module.exports = {
  createUser: (data, callback) => {
    let ticketInformationID;
    pool.query(
      "INSERT INTO `ticket_information` (`ticket_id`, `is_submitted`, `is_confirmed`, `datetime_submitted`, `datetime_confirmed`, `movie_date`) VALUES (NULL, '0', '0', NULL, NULL, NULL)",
      [],
      (err, results, fields) => {
        if (err) {
          err.message = "Database Error";
          return callback(err);
        }
        ticketInformationID = results.insertId;

        pool.query(
          `INSERT INTO user_credentials(user_email, fullname, password, ticket_id) VALUES(?,?,?,?)`,
          [data.userEmail, data.fullname, data.password, ticketInformationID],
          (err, results, fields) => {
            if (err) {
              err.message = "Database Error";
              return callback(err);
            }
            return callback(null, results);
          }
        );
      }
    );
  },
};
