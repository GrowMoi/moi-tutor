import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticateService) {
  }

  async canActivate() {
    const isLoggedIn = await this.authService.userIsLoggedIn();
    debugger
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
