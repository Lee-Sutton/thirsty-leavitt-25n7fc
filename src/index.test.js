const request = require("supertest");
const app = require("./index");

describe("get profile donations", () => {
  test("Returns donations for profile that exist", async () => {
    const res = await request(app)
      .get("/profiles/2ad19172-9683-407d-9732-8397d58ddcb2/donations")
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      data: [
        {
          id: "f7939023-3016-4a29-bffd-913f41b98598",
          donorName: "Jane Smith",
          amount: 5000,
          profileId: "2ad19172-9683-407d-9732-8397d58ddcb2",
          currency: "CAD",
        },
      ],
    });
    expect(res.body.data).toHaveLength(1);
  });

  test("Returns 404 if profile does not exist", async () => {
    const res = await request(app)
      .get("/profiles/2ad19172-9683-407d-9732-8397d87ddcb2/donations")
      .send();
    expect(res.statusCode).toBe(404);
  });

  test("Returns 400 if profile id is invalid", async () => {
    const res = await request(app)
      .get("/profiles/fjdkaslfjdskal/donations")
      .send();
    expect(res.statusCode).toBe(400);
  });
});

describe("Post profile donations", () => {
  test("Creates a donation for the input profile", async () => {
    const donation = {
      donorName: "Jane Smith",
      amount: 5000,
      profileId: "2ad19172-9683-407d-9732-8397d58ddcb2",
      currency: "CAD",
    };
    let res = await request(app)
      .post("/profiles/2ad19172-9683-407d-9732-8397d58ddcb2/donations")
      .send(donation);
    expect(res.statusCode).toBe(201);

    res = await request(app)
      .get("/profiles/2ad19172-9683-407d-9732-8397d58ddcb2/donations", donation)
      .send();

    expect(res.body.data).toHaveLength(2);
  });

  test("Returns 404 if profile does not exist", async () => {
    const res = await request(app)
      .post("/profiles/2ad19172-9683-407d-9732-8397d87ddcb2/donations")
      .send();
    expect(res.statusCode).toBe(404);
  });

  test("Returns 400 if profile id is invalid", async () => {
    const res = await request(app)
      .post("/profiles/fjdkaslfjdskal/donations")
      .send();
    expect(res.statusCode).toBe(400);
  });
});
