const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const adminRepository = require("../models/admin/admin.repository");
const logger = require("../utils/logger");

const authenticate = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.replace("Bearer ", "") ||
      req.cookies?.accessToken;

    if (!token) {
      logger.warn("Access token missing");
      throw new ApiError(401, "Access token is required");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    logger.info("Token decoded successfully", { id: decoded.id });

    // Only ADMIN flow
    const admin = await adminRepository.findById(decoded.id);

    if (!admin) {
      logger.warn("Admin not found for token", { id: decoded.id });
      throw new ApiError(401, "Admin not found");
    }

    // token version check (security)
    if (decoded.version !== admin.tokenVersion) {
      logger.warn("Token version mismatch", {
        decoded: decoded.version,
        db: admin.tokenVersion,
        id: decoded.id,
      });

      throw new ApiError(
        401,
        `Token version mismatch: decoded=${decoded.version}, db=${admin.tokenVersion}`
      );
    }

    req.user = {
      id: admin._id,
      role: admin.role,
      type: "admin",
    };

    logger.info("Admin authenticated successfully", {
      id: admin._id,
      role: admin.role,
    });

    next();
  } catch (error) {
    logger.error("Authentication failed", error);

    const message = error.message || "Invalid or expired token";
    next(new ApiError(401, message));
  }
};

module.exports = authenticate;