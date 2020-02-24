import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageService } from '../services/storage.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  http = (params: any) => null;

  constructor(private storageService: StorageService) { }

  private async requestHandler(request: any) {
    const [
      accessToken,
      client,
      expiry,
      tokenType,
      uid,
    ] = await Promise.all([
      this.storageService.getAccessToken(),
      this.storageService.getClientHash(),
      this.storageService.getExpiry(),
      this.storageService.getTokenType(),
      this.storageService.getUid(),
    ]);

    if (accessToken && client && expiry && tokenType && uid) {
      const ACCESS_HEADERS = environment.ACCESS_HEADERS;
      request.headers.common[ACCESS_HEADERS.accessToken] = accessToken;
      request.headers.common[ACCESS_HEADERS.client] = client;
      request.headers.common[ACCESS_HEADERS.expiry] = expiry;
      request.headers.common[ACCESS_HEADERS.tokenType] = tokenType;
      request.headers.common[ACCESS_HEADERS.uid] = uid;
    }

    return request;
  }

  private errorHandler(error: any) {
    return Promise.reject({ ...error });
  }

  private async successHandler(response: any) {
    const ACCESS_HEADERS = environment.ACCESS_HEADERS;
    const accessToken = response.headers[ACCESS_HEADERS.accessToken];
    const client = response.headers[ACCESS_HEADERS.client];
    const expiry = response.headers[ACCESS_HEADERS.expiry];
    const tokenType = response.headers[ACCESS_HEADERS.tokenType];
    const uid = response.headers[ACCESS_HEADERS.uid];

    if (accessToken && client && expiry && tokenType && uid) {
      await Promise.all([
        this.storageService.setAccessToken(accessToken),
        this.storageService.setClientHash(client),
        this.storageService.setExpiry(expiry),
        this.storageService.setTokenType(tokenType),
        this.storageService.setUid(uid),
      ]);
    }
    return response;
  }

  createIntance = () => {
    const instance = axios.create({
      baseURL: environment.API_URL,
    });
    // Add interceptors
    instance.interceptors.request.use(
      request => this.requestHandler(request)
    );

    instance.interceptors.response.use(
      response => this.successHandler(response),
      error => this.errorHandler(error)
    );

    this.http = instance;
  }

}
