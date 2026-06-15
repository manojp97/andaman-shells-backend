const packageService = require("./package.service");

class PackageController {
  async create(req, res) {
    try {
      const { title, type } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image is required",
        });
      }

      const data = {
        title,
        type,
        image: req.file.path, // Cloudinary URL
      };

      const result = await packageService.createPackage(data);

      return res.status(201).json({
        success: true,
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
      const result = await packageService.getPackages();

      return res.status(200).json({
        success: true,
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
      const result = await packageService.deletePackage(req.params.id);

      return res.status(200).json({
        success: true,
        data: result,
        message: "Package deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new PackageController();