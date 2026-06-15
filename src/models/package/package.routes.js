const express = require("express");
const router = express.Router();

const upload = require("../../middleware/upload.middleware.js");
const packageController = require("./package.controller.js");

router.post(
  "/",
  upload.single("image"),
  packageController.create
);

router.get("/", packageController.getAll);

router.delete("/:id", packageController.delete);

module.exports = router;