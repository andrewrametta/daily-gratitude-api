const { json } = require("express");
const express = require("express");
const xss = require("xss");
const usersRouter = express.Router();
const jsonParser = express.json();
const usersService = require("./users-service");

const serializeUser = (user) => {
  return {
    id: user.id,
    username: xss(user.username),
  };
};

usersRouter
  .route("/")
  .all((req, res, next) => {
    knexInstance = req.app.get("db");
    next();
  })
  .post(jsonParser, (req, res) => {
    res.json(req.body);
  });
