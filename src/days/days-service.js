const DaysService = {
  getDaysByUserId(knex, user_id) {
    return knex.from("days").select("*").where("user_id", user_id);
  },
  insertDay(knex, newDay) {
    return knex
      .insert(newDay)
      .into("days")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = DaysService;
