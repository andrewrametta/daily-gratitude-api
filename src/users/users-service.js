const knex = require("knex");

const UsersService = {
  hasUserWithUsername(knex, username) {
    return knex("users")
      .where({ username })
      .first()
      .then((user) => !!user);
  },
};

module.exports = UsersService;
