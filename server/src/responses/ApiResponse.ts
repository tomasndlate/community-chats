export class ApiResponse {
  status: string;
  message: string;
  data: null;
  errors: null;

  constructor(status: string, message: string, data: any = null, errors: any = null) {
    // "success" or "error"
    this.status = status;
    // A short message about the response
    this.message = message;
    // The actual data (can be null if it's an error)
    this.data = data;
    // Array of errors (can be null if success)
    this.errors = errors;
  }

    static success(message: string, data: any = null) {
        return new ApiResponse("success", message, data, null);
    }

    static error(message: string, errors: any = null) {
        return new ApiResponse("error", message, null, errors);
    }
}

