const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    video: {
      type: String, // YouTube CLEAN ID store hoga
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);  