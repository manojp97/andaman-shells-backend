// faq.repository.js

const FAQ = require("./faq.model");

class FAQRepository {
  async create(data) {
    return await FAQ.create(data);
  }

  async findAll() {
    return await FAQ.find().sort({ createdAt: -1 });
  }

  async delete(id) {
    return await FAQ.findByIdAndDelete(id);
  }
}

module.exports = new FAQRepository();