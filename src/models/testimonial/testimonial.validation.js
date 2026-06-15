const { z } = require("zod");

const createTestimonialSchema = z.object({
  video: z
    .string()
    .trim()
    .min(1, "Video ID is required"),
});

const updateTestimonialSchema =
  createTestimonialSchema.partial();

module.exports = {
  createTestimonialSchema,
  updateTestimonialSchema,
};