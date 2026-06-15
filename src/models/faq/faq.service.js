// faq.service.js

const faqRepository = require("./faq.repository");

class FAQService {
  async createFAQ(data) {
    return await faqRepository.create(data);
  }

  async getFAQs() {
    return await faqRepository.findAll();
  }

  async deleteFAQ(id) {
    return await faqRepository.delete(id);
  }
}

module.exports = new FAQService();