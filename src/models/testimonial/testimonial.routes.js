const express = require("express");

const {
  createTestimonial,
  getTestimonial,
  deleteTestimonial,
} = require("./testimonial.controller.js");

const validate = require("../../middleware/validate.js");

const {
  createTestimonialSchema,
} = require("./testimonial.validation.js");

const router = express.Router();

/* CREATE */
router.post(
  "/",
  validate(createTestimonialSchema),
  createTestimonial
);

/* GET ALL */
router.get("/", getTestimonial);

/* DELETE */
router.delete("/:id", deleteTestimonial);

/* EXPORT */
module.exports = router;