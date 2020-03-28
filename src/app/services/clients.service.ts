import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { UtilsService } from './utils.service';
import { NgRedux } from '@angular-redux/store';
import { MoiTutorState } from '../store';
import {
  GET_CLIENTS,
  LOAD_CLIENTS,
  LOAD_CLIENTS_SUCCESS,
  LOAD_CLIENTS_ERROR,
  START_REMOVE_SELECTED_CLIENTS_FROM_LIST,
  REMOVE_SELECTED_CLIENTS_FROM_LIST_SUCCESS,
  REMOVE_SELECTED_CLIENTS_FROM_LIST_ERROR,
  RESET_CLIENTS,
} from '../actions';
import { Observable } from 'rxjs';
import { Promise, reject } from 'q';

export interface ClientParams {
  page: number;
  search?: '';
}

interface ClientSendRequestData {
  user_ids: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private httpService: HttpService,
    private utilsService: UtilsService,
    private ngRedux: NgRedux<MoiTutorState>,
  ) { }

  getClients(params?: ClientParams) {
    this.ngRedux.dispatch({type: LOAD_CLIENTS });
    return this.loadClients(params).then((data) => {
      this.ngRedux.dispatch({type: GET_CLIENTS, payload: data});
      this.ngRedux.dispatch({type: LOAD_CLIENTS_SUCCESS });
    }, (message) => {
      this.ngRedux.dispatch({type: LOAD_CLIENTS_ERROR });
      return reject(message);
    });
  }

  loadClients(params?: ClientParams) {
    return this.httpService.http({
      method: 'get',
      url: '/tutor/dashboard/get_clients',
      params
    })
    .then((response) => {
      const data = response.data || {};
      return data;
    })
    .catch((error) => {
      const message = this.utilsService.getErrorMessage(error);
      return reject(message);
    });
  }

  searchClients(params?: ClientParams) {
    this.ngRedux.dispatch({type: RESET_CLIENTS });
    this.getClients(params);
  }

  getMoreClients(params?: ClientParams) {
    return this.loadClients(params).then((data: any) => {
      this.ngRedux.dispatch({type: GET_CLIENTS, payload: data});
      return data;
    }, (error: any) => {
      const message = this.utilsService.getErrorMessage(error);
      return reject(message);
    });
  }

  sendRequestToClients(data: ClientSendRequestData) {
    this.ngRedux.dispatch({type: START_REMOVE_SELECTED_CLIENTS_FROM_LIST});
    return new Observable(subscriber => {
      this.httpService.http({
        method: 'post',
        url: '/tutor/user_tutors/send_request',
        data,
      })
      .then((response) => {
        const message = response.data && response.data.message ? response.data.message : response.data;
        subscriber.next(message);
        subscriber.complete();
        const selectedClientIds = data.user_ids;
        this.ngRedux.dispatch({type: REMOVE_SELECTED_CLIENTS_FROM_LIST_SUCCESS, payload: selectedClientIds});
      })
      .catch((error) => {
        const message = this.utilsService.getErrorMessage(error);
        subscriber.error(message);
        this.ngRedux.dispatch({type: REMOVE_SELECTED_CLIENTS_FROM_LIST_ERROR});
      });
    });
  }
}
