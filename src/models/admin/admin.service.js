const jwt = require("jsonwebtoken");
const adminRepository = require("./admin.repository");
const ApiError = require("../../utils/ApiError");

const { HTTP_STATUS, MESSAGES } = require("../../constants/index.js");
// const { BAD_REQUEST } = require("../../constants/httpStatus");

class AdminService {
  getTokenSecret(key) {
    const secret = process.env[key] || (key === "REFRESH_TOKEN_SECRET" ? process.env.JWT_SECRET : undefined);
    if (!secret) {
      throw new ApiError( HTTP_STATUS.INTERNAL_SERVER_ERROR, `${key} is required in .env`);
    }
    return secret;
  }

  generateAccessToken(adminId, tokenVersion) {
    return jwt.sign(
      { id: adminId, version: tokenVersion, type: "admin" },
      this.getTokenSecret("JWT_SECRET"),
      {
        expiresIn: process.env.JWT_EXPIRE || "7d",
      }
    );
  }

  generateRefreshToken(adminId, tokenVersion) {
    return jwt.sign(
      { id: adminId, version: tokenVersion, type: "admin" },
      this.getTokenSecret("REFRESH_TOKEN_SECRET"),
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE || "30d",
      }
    );
  }

  async register(name, email, password, role = "admin", permissions = []) {
    const existingAdmin = await adminRepository.findByEmail(email);
    if (existingAdmin) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Admin already exists with this email");
    }

    const admin = await adminRepository.create({
      name,
      email,
      password,
      role,
      permissions,
    });

    const accessToken = this.generateAccessToken(admin._id, admin.tokenVersion);
    const refreshToken = this.generateRefreshToken(admin._id, admin.tokenVersion);

    await adminRepository.updateById(admin._id, { refreshToken });

    return { admin, accessToken, refreshToken };
  }

  async login(email, password) {
    if (!email || !password) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Email and password are required");
    }

    const admin = await adminRepository.findByEmailWithPassword(email);
    if (!admin) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
    }

    if (!admin.isActive) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, "Admin account is inactive");
    }

    const isPasswordValid = await admin.matchPassword(password);
    if (!isPasswordValid) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
    }

    const accessToken = this.generateAccessToken(admin._id, admin.tokenVersion);
    const refreshToken = this.generateRefreshToken(admin._id, admin.tokenVersion);

    await adminRepository.updateById(admin._id, { refreshToken });

    return { admin, accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken) {
    if (!refreshToken) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Refresh token is required");
    }

    try {
      const decoded = jwt.verify(
        refreshToken,
        this.getTokenSecret("REFRESH_TOKEN_SECRET")
      );

      if (decoded.type !== "admin") {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid token type");
      }

      const admin = await adminRepository.findByIdWithRefreshToken(decoded.id);
      if (!admin) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Admin not found");
      }

      if (!admin.isActive) {
        throw new ApiError(HTTP_STATUS.FORBIDDEN, "Admin account is inactive");
      }

      if (admin.refreshToken !== refreshToken) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Refresh token was revoked");
      }

      if (decoded.version !== admin.tokenVersion) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Refresh token was revoked");
      }

      const newAccessToken = this.generateAccessToken(admin._id, admin.tokenVersion);

      return { accessToken: newAccessToken };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (error.name === "TokenExpiredError") {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Refresh token has expired");
      }
      if (error.name === "JsonWebTokenError") {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid refresh token format");
      }
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid refresh token");
    }
  }

  async logout(adminId) {
    await adminRepository.revokeTokens(adminId);
    return { message: "Logged out successfully" };
  }

  async getProfile(adminId) {
    const admin = await adminRepository.findById(adminId);
    if (!admin) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Admin not found");
    }
    return admin;
  }

  async updateProfile(adminId, updateData) {
    const admin = await adminRepository.updateById(adminId, updateData);
    if (!admin) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Admin not found");
    }
    return admin;
  }

  async deactivateAdmin(adminId) {
    const admin = await adminRepository.softDelete(adminId);
    if (!admin) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Admin not found");
    }
    return { message: "Admin deactivated successfully" };
  }

  async deleteAdmin(adminId) {
    const admin = await adminRepository.delete(adminId);
    if (!admin) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Admin not found");
    }
    return { message: "Admin deleted successfully" };
  }

  async getAllAdmins() {
    const admins = await adminRepository.findAll();
    return admins;
  }
}

module.exports = new AdminService();
