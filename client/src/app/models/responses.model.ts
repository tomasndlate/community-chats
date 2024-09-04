import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";

// SUCCESS RESPONSE
export interface ApiSuccessResponse<T> {
  code: string;
  data: T;
  message: string;
  status: string;
}

// ERROR RESPONSE
export interface ApiErrorResponse  {
  code: string;
  details: Array<ErrorDetail>;
  message: string;
  status: string;
}


interface ErrorDetail {
  field: string;
  errorCode: string;
  message: string;
}
