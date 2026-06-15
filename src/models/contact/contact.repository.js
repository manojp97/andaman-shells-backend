const Contact = require("./contact.model");

class ContactRepository {
  async create(data) {
    return await Contact.create(data);
  }

  async findAll() {
    return await Contact.find().sort({ createdAt: -1 });
  }

  async deleteById(id) {
    return await Contact.findByIdAndDelete(id);
  }
}

module.exports = new ContactRepository();