const router = require("express").Router();

const adminRoutes = require("../models/admin/admin.routes");

router.use("/admin", adminRoutes);

router.use("/packages", require("../models/package/package.routes"));
router.use("/gallery", require("../models/gallery/gallery.routes"));
router.use("/faqs", require("../models/faq/faq.routes"));
router.use("/testimonial", require("../models/testimonial/testimonial.routes"));
router.use("/contacts", require("../models/contact/contact.routes"));
router.use("/contact-info", require("../models/contactInfo/contactInfo.routes"));

module.exports = router;