const Admin = require("./admin.model");
const logger = require("../../utils/logger");

class AdminRepository {
  async create(data) {
    try {
      const result = await Admin.create(data);
      logger.info("Admin created in DB", { id: result._id, email: result.email });
      return result;
    } catch (error) {
      logger.error("Admin create failed", error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const result = await Admin.findById(id);
      logger.info("Find admin by ID", { id });
      return result;
    } catch (error) {
      logger.error("FindById failed", error);
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const result = await Admin.findOne({ email });
      logger.info("Find admin by email", { email });
      return result;
    } catch (error) {
      logger.error("FindByEmail failed", error);
      throw error;
    }
  }

  async findByEmailWithPassword(email) {
    try {
      const result = await Admin.findOne({ email }).select("+password");
      logger.info("Find admin with password", { email });
      return result;
    } catch (error) {
      logger.error("findByEmailWithPassword failed", error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await Admin.find({ isActive: true }).sort({ createdAt: -1 });
      logger.info("Fetched all admins");
      return result;
    } catch (error) {
      logger.error("FindAll admins failed", error);
      throw error;
    }
  }

  async updateById(id, data) {
    try {
      const result = await Admin.findByIdAndUpdate(id, data, { new: true });
      logger.info("Admin updated", { id });
      return result;
    } catch (error) {
      logger.error("UpdateById failed", error);
      throw error;
    }
  }

  async revokeTokens(id) {
    try {
      const result = await Admin.findByIdAndUpdate(
        id,
        { $inc: { tokenVersion: 1 }, refreshToken: null },
        { new: true }
      );

      logger.warn("Admin tokens revoked", { id });
      return result;
    } catch (error) {
      logger.error("RevokeTokens failed", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const result = await Admin.findByIdAndDelete(id);
      logger.warn("Admin deleted permanently", { id });
      return result;
    } catch (error) {
      logger.error("Delete admin failed", error);
      throw error;
    }
  }

  async softDelete(id) {
    try {
      const result = await Admin.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );

      logger.warn("Admin soft deleted", { id });
      return result;
    } catch (error) {
      logger.error("Soft delete failed", error);
      throw error;
    }
  }

  async findByIdWithRefreshToken(id) {
    try {
      const result = await Admin.findById(id).select("+refreshToken");
      logger.info("Find admin with refresh token", { id });
      return result;
    } catch (error) {
      logger.error("findByIdWithRefreshToken failed", error);
      throw error;
    }
  }

  async findByRole(role) {
    try {
      const result = await Admin.find({ role, isActive: true });
      logger.info("Find admins by role", { role });
      return result;
    } catch (error) {
      logger.error("findByRole failed", error);
      throw error;
    }
  }
}

module.exports = new AdminRepository();