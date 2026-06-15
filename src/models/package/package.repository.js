const Package = require("./package.model");

class PackageRepository {
  async create(data) {
    return await Package.create(data);
  }

  async findAll() {
    return await Package.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Package.findById(id);
  }

  async delete(id) {
    return await Package.findByIdAndDelete(id);
  }
}

module.exports = new PackageRepository();