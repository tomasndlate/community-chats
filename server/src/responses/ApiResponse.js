class ApiResponse {
    constructor(status, message, data = null, errors = null) {
      // "success" or "error"
      this.status = status;
      // A short message about the response
      this.message = message;
      // The actual data (can be null if it's an error)
      this.data = data;
      // Array of errors (can be null if success)
      this.errors = errors;
    }

    static success(message, data) {
        return new ApiResponse("success", message, data, null);
    }

    static error(message, errors = []) {
        return new ApiResponse("error", message, null, errors);
    }
}

module.exports = ApiResponse;
