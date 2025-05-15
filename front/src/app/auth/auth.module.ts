import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CoreModule } from "../core/core.module";



@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        AuthRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        CoreModule
    ]
  })
  export class AuthModule { }