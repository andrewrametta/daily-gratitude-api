const express = require("express");
const path = require("path");
const xss = require("xss");
const DaysService = require("./days-service");

const daysRouter = express.Router();
const jsonParser = express.json();

const serializeDay = (day) => ({
  id: day.id,
  user_id: day.user_id,
  date_created: day.date_created,
  text1: xss(day.text1),
  text2: xss(day.text2),
  text3: xss(day.text3),
});
//create a post for new day
daysRouter.route("/").post(jsonParser, (req, res, next) => {
  const { user_id, date_created, text1, text2, text3 } = req.body;
  const newDay = { user_id, date_created, text1, text2, text3 };
  //const knexInstance = req.app.get("db");

  for (const [key, value] of Object.entries(newDay))
    if (value == null)
      return res.status(400).json({
        error: { message: `'${key}' is required` },
      });
  DaysService.insertDay(req.app.get("db"), newDay)
    .then((day) => {
      res.status(201).json(serializeDay(day));
    })
    .catch(next);
});

//create a get for all days where user id
daysRouter.route("/:user_id").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  const user_id = req.params.user_id;
  DaysService.getDaysByUserId(knexInstance, user_id)
    .then((days) => {
      res.json(days.map(serializeDay));
    })
    .catch(next);
});

module.exports = daysRouter;
