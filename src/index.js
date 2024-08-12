const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

/**
 * Fundraising profiles have the following shape:
 * id - A unique identifier, UUID v4
 * name - The display name for the profile
 * total - The total amount raised, in cents
 * parentId - The id of the profile that this profile belongs to. An ID of null indicates that the profile belongs is the root campaign profile
 * currency - The currency the profile is tracking their total in
 */
let profiles = [
  {
    id: "78afca18-8162-4ed5-9a7b-212b98c9ec87",
    name: "Campaign Profile",
    parentId: null,
    currency: "CAD",
  },
  {
    id: "2ad19172-9683-407d-9732-8397d58ddcb2",
    name: "Nick's Fundraising Profile",
    parentId: "78afca18-8162-4ed5-9a7b-212b98c9ec87",
    total: 5000,
    currency: "CAD",
  },
];

/**
 * Donations have the following shape:
 * id - A unique identifier, UUID v4
 * donorName - The full name of the person making the donation
 * amount - The amount being donated, in cents
 * profileId - The profile the donation is made to
 * currency - The currency the donation is made in
 */
let donations = [
  {
    id: "f7939023-3016-4a29-bffd-913f41b98598",
    donorName: "Jane Smith",
    amount: 5000,
    profileId: "2ad19172-9683-407d-9732-8397d58ddcb2",
    currency: "CAD",
  },
];

/**
 * Conversion rates from given currencies to USD
 * The numbers indicate that 1 CAD is equal to 0.73 USD
 */
const conversionRates = {
  USD: 1,
  CAD: 0.73,
  EUR: 1.09,
};

app.get("/", (req, res) => {
  res.send("Welcome to the Keela API");
});

/**
 * Fetch all profiles
 */
app.get("/profiles", (req, res) => {
  res.json(profiles);
});

/**
 * Fetch a single profiles donations
 */
app.get("/profiles/:profile/donations", (req, res) => {
  // Your implementation here
});

/**
 * Submit a new donation to the profile with the given ID
 */
app.post("/profiles/:profile/donations", (req, res) => {
  // Your implementation here
});

/**
 * Submit a new donation to the campaign
 */
app.post("/donations", (req, res) => {
  // Your implementation here
});

module.exports = app;

if (process.env.NODE_ENV !== "TEST") {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
