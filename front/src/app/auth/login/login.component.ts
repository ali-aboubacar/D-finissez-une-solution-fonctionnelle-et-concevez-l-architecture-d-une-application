import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { StrongPasswordRegx } from "src/app/_helpers/validators";
import { errorType } from "src/app/_interfaces/toast";
import { AuthService } from "src/app/_services/auth.service";
import { ToastService } from "src/app/_services/toast.service";
import { TokenService } from "src/app/_services/token.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit {
    private loginFormGoupField!: FormGroup;

    private showPasswordField: boolean = true;

    constructor(private authService: AuthService,
      private tokenService: TokenService,
      private router: Router,
      private route: ActivatedRoute,
      private toastService: ToastService) {}

    public get loginFormGoup() {
      return this.loginFormGoupField;
    }

    public get showPassword() {
      return this.showPasswordField
    }
  
    public get loginFormGoupControls(): {[key:string]: AbstractControl}{
      return this.loginFormGoup['controls'];
    }


    ngOnInit(): void {
      this.loginFormGoupField = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.pattern(StrongPasswordRegx)])
      })
    }

    togglePasswordVisibility(): void {
      this.showPasswordField = !this.showPasswordField;
    }

    onSubmit(): void{
      this.authService.login(this.loginFormGoup.value).subscribe({
        next: (res) => {
          this.tokenService.saveToken(res.token);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
          this.router.navigateByUrl(returnUrl)
        },
        error: (err) => {
          this.toastService.showToast(err.error.message, errorType(err));
        }
      })
    }
  }