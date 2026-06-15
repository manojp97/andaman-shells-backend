const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const MESSAGES = {
  ADMIN_NOT_FOUND: "Admin not found",
  ADMIN_CREATED: "Admin registered successfully",
  ADMIN_LOGIN_SUCCESS: "Admin logged in successfully",
  INVALID_CREDENTIALS: "Invalid email or password",
  PACKAGE_NOT_FOUND: "Package not found",
  PACKAGE_CREATED: "Package created successfully",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNAUTHORIZED: "Unauthorized access",
};

// ✅ IMPORTANT: single export object
module.exports = {
  HTTP_STATUS,
  MESSAGES,
};