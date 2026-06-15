const faqService = require("./faq.service");

class FAQController {
  async create(req, res) {
    try {
      const faqData = {
        question: req.body.question,
        answer: req.body.answer,
      };

      const result = await faqService.createFAQ(faqData);

      return res.status(201).json({
        success: true,
        message: "FAQ Created Successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const result = await faqService.getFAQs();

      return res.status(200).json({
        success: true,
        count: result.length,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const result = await faqService.deleteFAQ(req.params.id);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "FAQ Not Found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "FAQ Deleted Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new FAQController();