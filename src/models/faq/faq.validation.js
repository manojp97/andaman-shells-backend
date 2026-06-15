const { z } = require("zod");

const createFaqSchema = z.object({
  question: z
    .string()
    .trim()
    .min(5, "Question must be at least 5 characters")
    .max(200, "Question too long"),

  answer: z
    .string()
    .trim()
    .min(5, "Answer must be at least 5 characters")
    .max(1000, "Answer too long"),
});

const updateFaqSchema = createFaqSchema.partial();

module.exports = {
  createFaqSchema,
  updateFaqSchema,
};