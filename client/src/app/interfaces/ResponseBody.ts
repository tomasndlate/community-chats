import { HttpErrorResponse } from "@angular/common/http";

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T | null;
  errors: ApiResponse_Error[] | null;
}

export interface ApiResponse_Error {
  code: string,
  message: string
}

export interface ApiErrorResponse extends HttpErrorResponse {
  error: ApiResponse<null>
}
