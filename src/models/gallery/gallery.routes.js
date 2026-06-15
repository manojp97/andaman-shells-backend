const express = require("express");
const router = express.Router();

const upload = require("../../middleware/upload.middleware");
const validate = require("../../middleware/validate");

const galleryController = require("./gallery.controller");

const { createGallerySchema } = require("./gallery.validation");

router.post(
  "/",
  upload.single("image"),
  galleryController.create
);
router.get("/", galleryController.getAll);

router.delete("/:id", galleryController.delete);

module.exports = router;
