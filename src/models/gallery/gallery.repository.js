const Gallery = require("./gallery.model");

class GalleryRepository {
  async create(data) {
    return await Gallery.create(data);
  }

  async findAll() {
    return await Gallery.find().sort({
      createdAt: -1,
    });
  }

  async delete(id) {
    return await Gallery.findByIdAndDelete(id);
  }
}

module.exports = new GalleryRepository();