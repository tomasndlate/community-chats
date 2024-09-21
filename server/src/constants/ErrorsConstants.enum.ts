export const ErrorConstants = {
  INVALID: {
    USER: { code: "INVALID_USER", message: "User is invalid" },
    NAME: { code: "INVALID_NAME", message: "Name is invalid" },
    EMAIL: { code: "INVALID_EMAIL", message: "Email is invalid" },
    PASSWORD: { code: "INVALID_PASSWORD", message: "Password is invalid" },
    FILTER_PAGE: { code: "INVALID_FILTER_PAGE", message: "Invalid page number query" },
    FILTER_LIMIT: { code: "INVALID_FILTER_LIMIT", message: "Invalid limit number query" },
  },
  DUPLICATED: {
    EMAIL: { code: "DUPLICATED_EMAIL", message: "Email is already in use" },
  },
  UNAUTHORIZED: {
    SIGNIN: { code: "UNAUTHORIZED_SIGNIN", message: "Email or password not valid" },
    OTHER_SIGNIN: { code: "UNAUTHORIZED_OTHER_SIGNIN", message: "Other type of authentication required" },
    TOKEN_NOT_FOUND: {code: "UNAUTHORIZED_NO_TOKEN", message: "No access token found in request"},
    TOKEN_INVALID: {code: "UNAUTHORIZED_INVALID_TOKEN", message: "Invalid access token"},
  },
  NOT_FOUND: {
    EMAIL: { code: "NOT_FOUND_EMAIL", message: "Email not found" },
    COMMUNITY: { code: "NOT_FOUND_COMMUNITY", message: "Community not found" },
  },
  INTERNAL_ERROR: {
    SOCKET: { code: "INTERNAL_ERROR_SOCKET", message: "Internal server error" }
  }
} as const;

export type ErrorConstantsType = { code: string, message: string };

