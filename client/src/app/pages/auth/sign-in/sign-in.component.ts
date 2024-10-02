import { Component } from '@angular/core';
import { ApiErrorResponse, ApiResponse } from 'src/app/interfaces/ResponseBody';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email = ''
  password = ''
  errors = {
    not_found_email: '',
    invalid_credentials: ''
  }

  constructor(private authService: AuthService){}

  signIn() {
    this.authService.signin(this.email, this.password).subscribe({
      next: success => {
        // Success: not used this success value
      },

      error: (error: ApiErrorResponse) => {
        // Error: should display errors that come from response
        error.error.errors?.forEach(err => {
          switch(err.code) {
            case 'NOT_FOUND_EMAIL':
              this.errors.not_found_email = err.message;
              break
            case 'UNAUTHORIZED_SIGNIN':
              this.errors.invalid_credentials = err.message;
              break
          }
        })
      },

      complete: () => {
        // Success: should route to previous page, but signed in
        console.log(`Complete`)
      }

    })
  }
}
