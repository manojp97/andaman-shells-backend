const logger = require("../utils/logger");

const requestLogger = (req, res, next) => {
  logger.info("Incoming Request", {
    method: req.method,
    url: req.url,
    ip: req.ip,
    time: new Date().toISOString(),
  });

  next();
};

module.exports = requestLogger;