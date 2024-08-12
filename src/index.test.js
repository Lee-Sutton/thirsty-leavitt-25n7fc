const request = require("supertest");
const app = require("./index");

test("Sample test", async () => {
  const res = await request(app).get("/").send();
  expect(res.statusCode).toEqual(200);
  expect(res.text).toBe("Welcome to the Keela API");
});
