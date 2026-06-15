const contactRepo = require("./contact.repository");

class ContactService {
  async createContact(data) {
    return await contactRepo.create(data);
  }

  async getAllContacts() {
    return await contactRepo.findAll();
  }

  async deleteContact(id) {
    return await contactRepo.deleteById(id);
  }
}

module.exports = new ContactService();