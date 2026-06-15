const { z } = require("zod");

const createPackageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Type is required"),
});

const updatePackageSchema = z.object({
  title: z.string().optional(),
  type: z.string().optional(),
});

module.exports = {
  createPackageSchema,
  updatePackageSchema,
};