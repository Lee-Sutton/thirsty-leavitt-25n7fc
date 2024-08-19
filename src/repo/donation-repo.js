class DonationRepo {
  constructor(data) {
    this.data = data;
  }

  findByProfileId(profileId) {
    return this.data.filter((donation) => {
      return donation.profileId === profileId;
    });
  }

  insert(donation) {
    this.data.push(donation);
  }
}

module.exports = DonationRepo;
