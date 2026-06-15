const galleryService = require("./gallery.service");

class GalleryController {
  async create(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image is required",
        });
      }

      const result = await galleryService.createImage({
        image: req.file.path, // ✅ Cloudinary URL
      });

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.log("GALLERY ERROR:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const result = await galleryService.getImages();

      return res.json({
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
      await galleryService.deleteImage(req.params.id);

      return res.json({
        success: true,
        message: "Deleted",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new GalleryController();