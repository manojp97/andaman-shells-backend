const express = require("express");
const router = express.Router();

const {
  createContact,
  getContacts,
  deleteContact,
} = require("./contact.controller");

const validate = require("../../middleware/validate");
const { createContactSchema } = require("./contact.validation");

// PUBLIC FORM
router.post("/", validate(createContactSchema), createContact);

// ADMIN
router.get("/", getContacts);

router.delete("/:id", deleteContact);

module.exports = router;