import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TipoUsuario } from 'libs/data/src/lib/enums';

import { AuthenticationService } from '../../core/service/authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        console.log("canActivate:", route)
        if (currentUser) {
          if(route.url[0].path == "minha-conta"){
            return true
          }
          if(currentUser.Tipo == TipoUsuario.admin)
          // logged in so return true
          return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
