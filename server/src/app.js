const express = require("express");
const requestsRouter = require("./routers/requests");
require("./mongoose/db/mongoose");

//setting up the server
const app = express();

//setting up the CORS code
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET,PATCH,POST");
      return res.status(200).json({});
    }
    next();
});

//setting up the middlewares
app.use(express.json());
app.use(requestsRouter);

//exporting the server
module.exports = app;