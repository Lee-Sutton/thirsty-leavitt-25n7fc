const express = require("express");
const app = express();
const port = 8080;
const uuid = require("uuid");

// infra/services
const DonationService = require("./services/donation-service");
const ProfileService = require("./services/profile-service");

const DonationRepo = require("./repo/donation-repo");
const ProfileRepo = require("./repo/profile-repo");

app.use(express.json());

/**
 * Fundraising profiles have the following shape:
 * id - A unique identifier, UUID v4
 * name - The display name for the profile
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

const donationService = new DonationService(new DonationRepo(donations));
const profileService = new ProfileService(new ProfileRepo(profiles));

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
  const { profile } = req.params;
  if (!uuid.validate(profile)) {
    return res.status(400).json({ errors: { profile: "Invalid UUID" } });
  }
  if (profileService.findById(profile).length === 0) {
    return res.status(404).json({ errors: "Profile not found" });
  }
  const data = donationService.findByProfileId(profile);
  res.json({ data });
});

/**
 * Submit a new donation to the profile with the given ID
 */
app.post("/profiles/:profile/donations", (req, res) => {
  const { profile } = req.params;
  const donation = req.body;

  if (!uuid.validate(profile)) {
    return res.status(400).json({ errors: { profile: "Invalid UUID" } });
  }

  if (profileService.findById(profile).length === 0) {
    return res.status(404).json({ errors: "Profile not found" });
  }

  donationService.donateToProfile(profile, donation);
  res.status(201).send();
});

module.exports = app;

if (process.env.NODE_ENV !== "TEST") {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
