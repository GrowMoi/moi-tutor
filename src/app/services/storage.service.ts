import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  getAccessToken() {
    return this.storage.get(environment.ACCESS_TOKEN_KEY);
  }

  getClientHash() {
    return this.storage.get(environment.CLIENT_KEY);
  }

  getExpiry() {
    return this.storage.get(environment.EXPIRY_KEY);
  }

  getTokenType() {
    return this.storage.get(environment.TOKEN_TYPE_KEY);
  }

  getUid() {
    return this.storage.get(environment.UID_KEY);
  }

  getUserInfo() {
    return this.storage.get(environment.USER_INFO);
  }


  setAccessToken(value = '') {
    this.storage.set(environment.ACCESS_TOKEN_KEY, value);
  }

  setClientHash(value = '') {
    this.storage.set(environment.CLIENT_KEY, value);
  }

  setExpiry(value = '') {
    this.storage.set(environment.EXPIRY_KEY, value);
  }

  setTokenType(value = '') {
    this.storage.set(environment.TOKEN_TYPE_KEY, value);
  }

  setUid(value = '') {
    this.storage.set(environment.UID_KEY, value);
  }

  setUserInfo(value = '') {
    this.storage.set(environment.USER_INFO, value);
  }

  remove(key = '') {
    return this.storage.remove(key);
  }

  clearAppStorage() {
    return this.storage.clear();
  }
}
