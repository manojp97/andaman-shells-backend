const { z } = require("zod");
const ApiError = require("../../utils/ApiError");

const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Please provide a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["admin", "superadmin"]).default("admin"),
  permissions: z.array(z.string()).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().trim().min(1, "Refresh token is required"),
});

const updateProfileSchema = z.object({
  name: z.string().trim().min(1).optional(),
  email: z.string().trim().email("Please provide a valid email address").optional(),
  permissions: z.array(z.string()).optional(),
}).refine((data) => data.name || data.email || data.permissions, {
  message: "At least one field is required to update profile",
});

const validate = (schema, data) => {
  try {
    schema.parse(data);
  } catch (err) {
    const errorMessage = err.errors
      ? err.errors.map((e) => e.message).join(", ")
      : "Validation failed";
    throw new ApiError(400, errorMessage);
  }
};

const validateRegister = (req, res, next) => {
  validate(registerSchema, req.body);
  next();
};

const validateLogin = (req, res, next) => {
  validate(loginSchema, req.body);
  next();
};

const validateRefreshToken = (req, res, next) => {
  validate(refreshTokenSchema, {
    refreshToken: req.cookies?.refreshToken || req.body.refreshToken,
  });
  next();
};

const validateUpdateProfile = (req, res, next) => {
  validate(updateProfileSchema, req.body);
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateRefreshToken,
  validateUpdateProfile,
};
