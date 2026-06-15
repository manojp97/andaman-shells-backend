const express = require("express");

const router = express.Router();

const controller = require("./contactInfo.controller");

const validate = require("../../middleware/validate");

const {
  updateContactInfoSchema,
} = require("./contactInfo.validation");

// Public Route
router.get("/", controller.getContactInfo);

// Admin Route
router.put(
  "/",
  validate(updateContactInfoSchema),
  controller.updateContactInfo
);

module.exports = router;