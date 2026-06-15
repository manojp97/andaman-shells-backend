const express = require("express");
const adminController = require("./admin.controller");
const authenticate = require("../../middleware/auth.middleware");
const adminAuthLimiter = require("../../middleware/adminAuthLimiter");

const {
  validateRegister,
  validateLogin,
  validateRefreshToken,
  validateUpdateProfile,
} = require("./admin.validation");

const router = express.Router();


// PUBLIC ROUTES 

// Register admin
router.post(
  "/register",
  adminAuthLimiter,
  validateRegister,
  adminController.register
);

// Login admin
router.post(
  "/login",
  adminAuthLimiter,
  validateLogin,
  adminController.login
);

// Refresh token
router.post(
  "/refresh-token",
  validateRefreshToken,
  adminController.refreshAccessToken
);


// PROTECTED ROUTES

// Logout admin
router.post(
  "/logout",
  authenticate,
  adminController.logout
);

// Get profile
router.get(
  "/profile",
  authenticate,
  adminController.getProfile
);

// Update profile
router.put(
  "/profile",
  authenticate,
  validateUpdateProfile,
  adminController.updateProfile
);


// ADMIN MANAGEMENT

// Get all admins
router.get(
  "/all",
  authenticate,
  adminController.getAllAdmins
);

// Update admin by ID
router.patch(
  "/:adminId",
  authenticate,
  validateUpdateProfile,
  adminController.updateAdminById
);

// Deactivate admin
router.patch(
  "/:adminId/deactivate",
  authenticate,
  adminController.deactivateAdmin
);

// Delete admin
router.delete(
  "/:adminId",
  authenticate,
  adminController.deleteAdmin
);

module.exports = router;