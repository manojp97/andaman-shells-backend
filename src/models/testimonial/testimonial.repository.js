const Testimonial = require("./testimonial.model.js");

const createTestimonialItem = async (data) => {
  return await Testimonial.create(data);
};

const getAllTestimonialItems = async () => {
  return await Testimonial.find().sort({ createdAt: -1 });
};

const deleteTestimonialItem = async (id) => {
  return await Testimonial.findByIdAndDelete(id);
};

module.exports = {
  createTestimonialItem,
  getAllTestimonialItems,
  deleteTestimonialItem,
};