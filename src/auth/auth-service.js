const knex = require("knex");
const bcrypt = require("bcryptjs");

const AuthService = {
  getUserWithUsername(knex, username) {
    return knex("users").where({ username }).first();
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
};

module.exports = AuthService;
