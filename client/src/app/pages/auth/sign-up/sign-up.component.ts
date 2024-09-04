import { Component } from '@angular/core';
import { AuthFieldForm } from 'src/app/models/forms.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from "@angular/router"
import { ApiErrorResponse } from '../../../models/responses.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  usernameField: AuthFieldForm = {
    label: "Username",
    type: "text",
    value: "",
    status: "default",
    isLocked: false
  }

  emailField: AuthFieldForm = {
    label: "Email",
    type: "text",
    value: "",
    status: "default",
    isLocked: false
  }

  passwordField: AuthFieldForm = {
    label: "Password",
    type: "password",
    value: "",
    status: "default",
    isLocked: false
  }

  nameField: AuthFieldForm = {
    label: "Name",
    type: "text",
    value: "",
    status: "default",
    isLocked: false
  }

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {

    let isValidForm = true;

    if (!this.nameField.value) {
      isValidForm = false;
    }

    if (!this.nameField.value) {
      isValidForm = false;
    }

    if (!this.emailField.value) {
      isValidForm = false;
    }

    if (!this.passwordField.value) {
      isValidForm = false;
    }

    if (isValidForm) {
      this.authService.signUp(
        this.emailField.value,
        this.usernameField.value,
        this.passwordField.value,
        this.nameField.value
      ).subscribe({
        next: result => {
          if (result) {
            // this.authService.getPreviousUrl()
            this.router.navigate([this.authService.getPreviousUrl()]);
          }
        },
        error: (error: ApiErrorResponse) => {
          //
        },
        complete: () => {
          //
        }
      })
    }


  }

  test(){
    alert("HERE")
  }

  updateUsernameFieldValue(usernameField: AuthFieldForm, value: string) {
    usernameField.value = value
    console.log(usernameField)
  }
}
