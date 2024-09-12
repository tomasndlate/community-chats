const RequestErrors = {
  INVALID: {
    NAME: { code: "INVALID_NAME", message: "Name is invalid" },
    EMAIL: { code: "INVALID_EMAIL", message: "Email is invalid" },
    PASSWORD: { code: "INVALID_PASSWORD", message: "Password is invalid" }
  },
  DUPLICATED: {
    EMAIL: { code: "DUPLICATED_EMAIL", message: "Email is already in use" },
  },
  UNAUTHORIZED: {
    SIGNIN: { code: "UNAUTHORIZED_SIGNIN", message: "Email or password not valid" },
    OTHER_SIGNIN: { code: "UNAUTHORIZED_OTHER_SIGNIN", message: "Other type of authentication required" },
  },
  NOT_FOUND: {
    EMAIL: { code: "NOT_FOUND_EMAIL", message: "Email not found" },
  }
};

module.exports = {
  RequestErrors
};
