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

daysRouter.route();
