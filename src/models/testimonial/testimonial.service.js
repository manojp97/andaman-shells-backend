const {
  createTestimonialItem,
  getAllTestimonialItems,
  deleteTestimonialItem,
} = require("./testimonial.repository.js");

const addVideo = async (video) => {
  if (!video) throw new Error("Video ID required");

  return await createTestimonialItem({ video });
};

const getVideos = async () => {
  return await getAllTestimonialItems();
};

const removeVideo = async (id) => {
  return await deleteTestimonialItem(id);
};

module.exports = {
  addVideo,
  getVideos,
  removeVideo,
};