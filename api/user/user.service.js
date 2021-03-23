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
          [data.user_email, data.fullname, data.password, ticketInformationID],
          (err, results, fields) => {
            if (err) {
              if (err.code === "ER_DUP_ENTRY") {
                err.message = "Email telah terdaftar.";
              } else {
                err.message = "Database Error";
              }
              return callback(err);
            }
            return callback(null, results);
          }
        );
      }
    );
  },
  getUserByEmail: (data, callback) => {
    const email = data.email;

    pool.query(
      `SELECT * FROM user_credentials WHERE user_email = ?`,
      [email],
      (err, results, fields) => {
        if (err) {
          err.message = "Database Error";
          return callback(err);
        }
        return callback(null, results[0]);
      }
    );
  },
  getTicketInformation: (data, callback) => {
    pool.query(
      `SELECT * FROM ticket_information WHERE ticket_id = ?`,
      [data.ticketId],
      (err, results, fields) => {
        if (err) {
          err.message = "Database Error";
          return callback(err);
        }
        return callback(null, results[0]);
      }
    );
  },
};
