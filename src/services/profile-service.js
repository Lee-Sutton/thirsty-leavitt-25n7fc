class ProfileService {
  constructor(profileRepo) {
    this.repo = profileRepo;
  }
  findById(id) {
    return this.repo.findById(id);
  }
}

module.exports = ProfileService;
