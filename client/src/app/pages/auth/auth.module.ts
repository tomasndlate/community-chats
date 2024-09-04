import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutes } from './auth.routes';
import { AppUiComponentsModule } from 'src/app/components/app-ui-components/app-ui-components.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    AppUiComponentsModule,
    FormsModule
  ]
})
export class AuthModule { }
