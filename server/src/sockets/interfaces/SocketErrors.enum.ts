export const SocketErrorConstants = {
  INTERNAL_ERROR: { code: "SOCKET_INTERNAL_ERROR", message: "Internal server error" },
  NOT_FOUND: {
    COMMUNITY: { code: "SOCKET_NOT_FOUND_COMMUNITY", message: "Community not found" },
  },
  UNAUTHORIZED: {
    TOKEN: { code: "SOCKET_UNAUTHORIZED_TOKEN", message: "Unauthorized token" },
  }

} as const;

export type SocketErrorConstantsType = { code: string, message: string };
