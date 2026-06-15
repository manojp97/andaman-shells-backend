const express = require("express");
const router = express.Router();

const faqController = require("./faq.controller");

const validate = require("../../middleware/validate");

const {
  createFaqSchema,
  updateFaqSchema,
} = require("./faq.validation");

// CREATE (with validation)
router.post(
  "/",
  validate(createFaqSchema),
  faqController.create
);

// GET ALL
router.get("/", faqController.getAll);

// DELETE
router.delete("/:id", faqController.delete);

module.exports = router;