import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {

  }
  async canActivate() {
    const isIntroShowed = await this.storage.get(environment.IS_INTRO_SHOWED_KEY);
    if (isIntroShowed) {
      return true;
    } else {
      this.router.navigateByUrl('/intro');
    }
  }

}
