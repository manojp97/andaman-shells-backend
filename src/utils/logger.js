const winston = require("winston");
require("winston-daily-rotate-file");

// Daily rotate file transport
const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

// Error logs separate file
const errorRotateTransport = new winston.transports.DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "error",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "30d",
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    fileRotateTransport,
    errorRotateTransport,

    // console logs (dev friendly)
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

module.exports = logger;