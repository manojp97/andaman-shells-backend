const packageRepository = require("./package.repository");
const logger = require("../../utils/logger");

class PackageService {
  async createPackage(data) {
    try {
      const result = await packageRepository.create(data);
      logger.info("Package created", { id: result._id });
      return result;
    } catch (error) {
      logger.error("Create package failed", error);
      throw error;
    }
  }

  async getPackages() {
    try {
      const result = await packageRepository.findAll();
      logger.info("Fetched all packages");
      return result;
    } catch (error) {
      logger.error("Get packages failed", error);
      throw error;
    }
  }

  async getPackageById(id) {
    try {
      const result = await packageRepository.findById(id);
      logger.info("Fetched package by ID", { id });
      return result;
    } catch (error) {
      logger.error("Get package by ID failed", error);
      throw error;
    }
  }

  async deletePackage(id) {
    try {
      const result = await packageRepository.delete(id);
      logger.warn("Package deleted", { id });
      return result;
    } catch (error) {
      logger.error("Delete package failed", error);
      throw error;
    }
  }
}

module.exports = new PackageService();