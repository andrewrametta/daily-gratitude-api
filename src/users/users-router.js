const { json } = require("express");
const express = require("express");
const xss = require("xss");
const usersRouter = express.Router();
const jsonParser = express.json();
const UsersService = require("./users-service");

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
    const { username, password } = req.body;
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&])[\S]+/;
    for (const field of ["username", "password"]) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `Missing ${field}`,
        });
      }
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: `Password must be 8 or more characters`,
      });
    }

    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return res.status(400).json({
        error: `Password must contain one upper case character, one lower case character, one number, and one special character`,
      });
    }
    UsersService.hasUserWithUsername(knexInstance, username).then((hasUser) => {
      if (hasUser) {
        return res.status(400).json({
          error: `Username already exists`,
        });
      }
      res.status(201).json(req.body);
    });
  });

module.exports = usersRouter;
