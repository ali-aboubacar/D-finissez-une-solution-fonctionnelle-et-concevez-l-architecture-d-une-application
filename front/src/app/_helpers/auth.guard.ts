import { inject } from "@angular/core";
import { TokenService } from "../_services/token.service";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router)
    const tokenService = inject(TokenService)
    if(tokenService.getToken()){
      return true
    }
    router.navigate(['auth'], { queryParams: { returnUrl: state.url } })
    return false;
  };