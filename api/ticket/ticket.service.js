const moment = require("moment");
const pool = require("../../config/database");

moment.locale("id");

module.exports = {
  updateSubmittedStatus: (data, callback) => {
    data.movie_date = moment(data.movie_date, "DD MMMM YYYY").format(
      "YYYY-MM-DD"
    );

    pool.query(
      "UPDATE `ticket_information` SET `is_submitted` = '1', `datetime_submitted` = ?, `movie_date` = ?, `ticket_bundle` = ?, `ticket_price` = ?, `bank_destination` = ?, `account_number` = ?, `bank_source` = ?, `name` = ? WHERE `ticket_information`.`ticket_id` = ?",
      [
        moment().format("YYYY-MM-DD HH:mm:ss"),
        data.movie_date,
        Number(data.ticket_bundle),
        data.ticket_price,
        data.bank_destination,
        data.account_number,
        data.bank_source,
        data.name,
        data.ticket_id,
      ],
      (err, results, fields) => {
        if (err) {
          process.env.NODE_ENV === "development" ? console.log(err) : void 0;
          err.message = "Database Error";
          return callback(err);
        }
        return callback(null, results.message);
      }
    );
  },
  updateConfirmedStatus: (data, callback) => {
    pool.query(
      "UPDATE `ticket_information` SET `is_confirmed` = ?, `datetime_confirmed` = ? WHERE `ticket_information`.`ticket_id` = ?",
      [
        Number(data.is_confirmed),
        moment().format("YYYY-MM-DD HH:mm:ss"),
        data.ticket_id,
      ],
      (err, results, fields) => {
        if (err) {
          err.message = "Database Error";
          return callback(err);
        }
        return callback(null, results.message);
      }
    );
  },
};
