const galleryRepository = require("./gallery.repository");

class GalleryService {
  async createImage(data) {
    return await galleryRepository.create(data);
  }

  async getImages() {
    return await galleryRepository.findAll();
  }

  async deleteImage(id) {
    return await galleryRepository.delete(id);
  }
}

module.exports = new GalleryService();