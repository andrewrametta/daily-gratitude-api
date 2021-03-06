const DaysService = {
  getByUserId(knex, user_id) {
    return knex.from("days").select("*").where("user_id", user_id).first();
  },
};

module.exports = DaysService;
