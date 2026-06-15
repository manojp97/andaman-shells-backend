const rateLimit = require("express-rate-limit");
const logger = require("../utils/logger");

const adminAuthLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 sec
  max: 5, // 5 attempts allowed

  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    logger.warn("Rate limit exceeded", {
      ip: req.ip,
      url: req.originalUrl,
    });

    res.status(429).json({
      success: false,
      message:
        "Too many login attempts. Please wait 10 seconds before trying again.",
    });
  },
});

module.exports = adminAuthLimiter;