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
