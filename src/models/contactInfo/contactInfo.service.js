const repository = require("./contactInfo.repository");

class ContactInfoService {
  async getContactInfo() {
    return await repository.get();
  }

  async updateContactInfo(payload) {
    return await repository.update(payload);
  }
}

module.exports = new ContactInfoService();