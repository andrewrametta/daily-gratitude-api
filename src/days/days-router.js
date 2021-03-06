const express = require("express");
const xss = require("xss");
const DaysService = require("./days-service");
const { requireAuth } = require("../middleware/jwt-auth");

const daysRouter = express.Router();

const serializeDay = (day) => ({
  id: day.id,
  date_created: day.date_created,
  text1: xss(day.text1),
  text2: xss(day.text2),
  text3: xss(day.text3),
});
daysRouter
  .route("/")
  // require Auth used in all endpoints for auth token authorization
  .get(requireAuth, (req, res, next) => {
    const knexInstance = req.app.get("db");

    const user_id = req.user.id;
    DaysService.getDaysByUserId(knexInstance, user_id)
      .then((days) => {
        res.json(days.map(serializeDay));
      })
      .catch(next);
  })
  .post(requireAuth, (req, res, next) => {
    const { text1, text2, text3 } = req.body;
    const newDay = { text1, text2, text3 };

    for (const [key, value] of Object.entries(newDay))
      if (value == null)
        return res.status(400).json({
          error: { message: `'${key}' is required` },
        });
    newDay.user_id = req.user.id;
    DaysService.insertDay(req.app.get("db"), newDay)
      .then((day) => {
        res.status(201).json(serializeDay(day));
      })
      .catch(next);
  });

module.exports = daysRouter;
