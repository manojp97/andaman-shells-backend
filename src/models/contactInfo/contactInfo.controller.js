const service = require("./contactInfo.service");

class ContactInfoController {
  async getContactInfo(req, res) {
    try {
      const data = await service.getContactInfo();

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateContactInfo(req, res) {
    try {
      const data = await service.updateContactInfo(
        req.body
      );

      res.status(200).json({
        success: true,
        message: "Contact info updated successfully",
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ContactInfoController();