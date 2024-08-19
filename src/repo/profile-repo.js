class ProfileRepo {
  constructor(data) {
    this.data = data;
  }
  findById(id) {
    return this.data.filter((profile) => profile.id === id);
  }
}

module.exports = ProfileRepo;
