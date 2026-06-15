const adminService = require("./admin.service");
const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse.js");
const logger = require("../../utils/logger");
const { HTTP_STATUS, MESSAGES } = require("../../constants/index.js");
class AdminController {
  register = asyncHandler(async (req, res) => {
    const { name, email, password, role, permissions } = req.body;

    logger.info("Admin Register Attempt", { email });

    const result = await adminService.register(
      name,
      email,
      password,
      role,
      permissions,
    );

    logger.info("Admin Registered Successfully", {
      id: result.admin._id,
      email,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    };

    res.cookie("refreshToken", result.refreshToken, cookieOptions);
    res.cookie("accessToken", result.accessToken, cookieOptions);

    return res.status(HTTP_STATUS.CREATED).json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        {
          admin: result.admin,
          accessToken: result.accessToken,
        },
        "Admin registered successfully",
      ),
    );
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    logger.info("Admin Login Attempt", { email });

    if (!email || !password) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Email and password required");
    }

    const result = await adminService.login(email, password);

    logger.info("Admin Login Success", { id: result.admin._id });

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        {
          admin: result.admin,
          accessToken: result.accessToken,
        },
        "Admin logged in successfully",
      ),
    );
  });
  refreshAccessToken = asyncHandler(async (req, res) => {
    logger.info("Access Token Refresh Attempt");

    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    const result = await adminService.refreshAccessToken(refreshToken);

    logger.info("Access Token Refreshed");

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        {
          accessToken: result.accessToken,
        },
        "Access token refreshed successfully",
      ),
    );
  });

  logout = asyncHandler(async (req, res) => {
    const adminId = req.user.id;

    logger.info("Admin Logout", { adminId });

    await adminService.logout(adminId);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, {}, "Admin logged out successfully"));
  });

  getProfile = asyncHandler(async (req, res) => {
    const adminId = req.user.id;

    logger.info("Get Profile", { adminId });

    const admin = await adminService.getProfile(adminId);

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, admin, "Admin profile fetched successfully"));
  });

  updateProfile = asyncHandler(async (req, res) => {
    const adminId = req.user.id;
    const { name, email, permissions } = req.body;

    const admin = await adminService.updateProfile(adminId, {
      name,
      email,
      permissions,
    });

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, admin, "Admin profile updated successfully"));
  });

  updateAdminById = asyncHandler(async (req, res) => {
    const { adminId } = req.params;
    const { name, email, permissions } = req.body;

    const admin = await adminService.updateProfile(adminId, {
      name,
      email,
      permissions,
    });

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, admin, "Admin updated successfully"));
  });

  getAllAdmins = asyncHandler(async (req, res) => {
    const admins = await adminService.getAllAdmins();

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, admins, "All admins fetched successfully"));
  });

  deactivateAdmin = asyncHandler(async (req, res) => {
    const { adminId } = req.params;

    const result = await adminService.deactivateAdmin(adminId);

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, result, "Admin deactivated successfully"));
  });

  deleteAdmin = asyncHandler(async (req, res) => {
    const { adminId } = req.params;

    const result = await adminService.deleteAdmin(adminId);

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, result, "Admin deleted successfully"));
  });
}

module.exports = new AdminController();
