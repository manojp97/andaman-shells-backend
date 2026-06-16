const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const routes = require("./routes");
const requestLogger = require("./middleware/requestLogger");

const app = express();

// ================= MIDDLEWARES =================
app.use(requestLogger);

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://andaman-shells-phi.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ================= STATIC FILES =================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// ================= ROUTES =================
app.use("/api", routes);

module.exports = app;