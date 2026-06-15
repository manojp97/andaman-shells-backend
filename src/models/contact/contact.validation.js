const { z } = require("zod");

const createContactSchema = z.object({
  name: z.string().min(2, "Name too short"),
  phone: z.string().min(10, "Invalid phone number"),
  message: z.string().min(5, "Message too short"),
});

module.exports = {
  createContactSchema,
};