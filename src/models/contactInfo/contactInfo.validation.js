const { z } = require("zod");

const updateContactInfoSchema = z.object({
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  mapsLink: z.string().optional(),
});

module.exports = {
  updateContactInfoSchema,
};