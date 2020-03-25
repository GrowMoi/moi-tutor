import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { HttpService } from '../services/http.service';
import { StorageService } from '../services/storage.service';
import _ from 'lodash';
import { UtilsService } from './utils.service';

interface LoginCredentials {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private storage: Storage,
    private storageService: StorageService,
    private httpService: HttpService,
    private utilsService: UtilsService
  ) { }

  async userIsLoggedIn() {
    const [
      accessToken,
      client,
      expiry,
      tokenType,
      uid,
      userInfo
    ] = await Promise.all([
      this.storageService.getAccessToken(),
      this.storageService.getClientHash(),
      this.storageService.getExpiry(),
      this.storageService.getTokenType(),
      this.storageService.getUid(),
      this.storageService.getUserInfo(),
    ]);
    const isLoguedIn = (!!accessToken && !!client && !!expiry && !!tokenType && !!uid && !_.isEmpty(userInfo));
    return isLoguedIn;
  }

  loginUser(credentials: LoginCredentials) {
    const apiCredentials = {
      ...credentials,
      login: credentials.login.trim()
    };
    return new Observable((subscriber) => {
      this.httpService.http({
        method: 'post',
        url: '/api/auth/user/sign_in',
        data: apiCredentials
      })
        .then((response) => {
          const userInfo = response.data && response.data.data ? response.data.data : response.data;
          this.storageService.setUserInfo(userInfo);
          subscriber.next(userInfo);
          subscriber.complete();
        })
        .catch((error) => {
          const message = this.utilsService.getErrorMessage(error);
          subscriber.error(message);
        });
    });
  }
}
