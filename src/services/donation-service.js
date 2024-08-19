const uuid = require("uuid");

class DonationService {
  constructor(donationsRepo) {
    this.repo = donationsRepo;
  }

  findByProfileId(profileId) {
    return this.repo.findByProfileId(profileId);
  }

  donateToProfile(profile, donation) {
    // charge card here
    this.repo.insert({
      id: uuid.v4().toString(),
      profileId: profile,
      ...donation,
    });
  }
}

module.exports = DonationService;
