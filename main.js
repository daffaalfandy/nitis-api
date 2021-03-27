require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/database");
const app = express();

app
  .use(express.json())
  .use(
    cors({
      origin: process.env.CLIENT_URI,
    })
  )
  // declared api
  .use(
    process.env.NODE_ENV === "development" ? "/api/user" : "/user",
    require("./api/user/user.router")
  )
  .use(
    process.env.NODE_ENV === "development" ? "/api/ticket" : "/ticket",
    require("./api/ticket/ticket.router")
  )
  .listen(process.env.APP_PORT, () => {
    console.log(`Server up and running on PORT: ${process.env.APP_PORT}`);
    console.log(`Server environment: ${process.env.NODE_ENV}`);
  });

pool.getConnection((err, connection) => {
  if (err) {
    console.log(`Database Status: ${err}`);
  } else {
    console.log("Database Status: Connected");
  }
});
