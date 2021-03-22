const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const makeUsersArray = require("./users.fixtures");
const makeDaysArray = require("./days.fixtures");
const { expect } = require("chai");

describe("Day Endpoints", function () {
  let db;
  let authToken;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  beforeEach("clean the table", () =>
    db.raw("TRUNCATE  users, days RESTART IDENTITY CASCADE;")
  );

  beforeEach("register and login", () => {
    let user = { username: "authtestuser", password: "P@ssword12!" };
    //let users = makeUsersArray();
    return supertest(app)
      .post("/api/users")
      .send(user)
      .then((res) => {
        return supertest(app)
          .post("/api/auth/login")
          .send(user)
          .then((res2) => {
            authToken = res2.body.authToken;
          });
      });
  });

  after("disconnect from db", () => db.destroy());

  describe("GET /api/days", () => {
    context("Given there are users and days in database", () => {
      const testDays = makeDaysArray();
      const testUsers = makeUsersArray();
      beforeEach("insert users", () => {
        return db
          .into("users")
          .insert(testUsers)
          .then(() => {
            return db.into("days").insert(testDays);
          });
      });

      it("responds with 200 and days", () => {
        const expectedDays = [
          {
            id: 1,
            date_created: "2021-03-16T13:30:06.300Z",
            text1: "I am grateful for this test",
            text2: "I am grateful for this project",
            text3: "I am greatful for thinkful",
          },
          {
            id: 2,
            date_created: "2021-03-16T13:30:06.300Z",
            text1: "I am grateful for this second test",
            text2: "I am grateful for this second project",
            text3: "I am greatful for thinkful",
          },
          {
            id: 3,
            date_created: "2021-03-16T13:30:06.300Z",
            text1: "I am grateful for this last test",
            text2: "I am grateful for this last project",
            text3: "I am greatful for thinkful",
          },
        ];
        return supertest(app)
          .get("/api/days")
          .set("Authorization", `bearer ${authToken}`)
          .expect(200, expectedDays);
      });
    });
  });
  describe("POST /api/days", () => {
    it("creates a day, responding with 201 and new days", () => {
      const newDay = {
        date_created: "2021-03-16T13:30:06.300Z",
        text1: "I am grateful for this last test",
        text2: "I am grateful for this last project",
        text3: "I am greatful for thinkful",
      };
      return supertest(app)
        .post("/api/days")
        .set("Authorization", `bearer ${authToken}`)
        .send(newDay)
        .expect(201)
        .expect((res) => {
          expect(res.body.text1).to.equal(newDay.text1);
          expect(res.body.text2).to.equal(newDay.text2);
          expect(res.body.text3).to.equal(newDay.text3);
        });
    });
    const requiredFields = ["text1", "text2", "text3"];

    requiredFields.forEach((field) => {
      const newDay = {
        text1: "I am grateful for this last test",
        text2: "I am grateful for this last project",
        text3: "I am greatful for thinkful",
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newDay[field];

        return supertest(app)
          .post("/api/days")
          .set("Authorization", `bearer ${authToken}`)
          .send(newDay)
          .expect(400, {
            error: { message: `'${field}' is required` },
          });
      });
    });
  });
});
