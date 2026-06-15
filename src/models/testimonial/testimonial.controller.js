const {
  addVideo,
  getVideos,
  removeVideo,
} = require("./testimonial.service.js");

/* ADD VIDEO */
const createTestimonial = async (req, res) => {
  try {
    const { video } = req.body;

    const result = await addVideo(video);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET ALL */
const getTestimonial = async (req, res) => {
  try {
    const data = await getVideos();

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
};

/* DELETE */
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    await removeVideo(id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* EXPORTS */
module.exports = {
  createTestimonial,
  getTestimonial,
  deleteTestimonial,
};