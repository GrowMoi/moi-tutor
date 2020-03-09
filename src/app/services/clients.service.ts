import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';
import { UtilsService } from './utils.service';
import { NgRedux } from '@angular-redux/store';
import { MoiTutorState } from '../store';
import { GET_CLIENTS, LOAD_CLIENTS, LOAD_CLIENTS_SUCCESS, LOAD_CLIENTS_ERROR } from '../actions';

interface ClientParams {
  page: '1';
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
    return this.httpService.http({
      method: 'get',
      url: '/tutor/dashboard/get_clients',
      params
    })
    .then((response) => {
      const clients = response.data && response.data.data ? response.data.data : response.data;
      this.ngRedux.dispatch({type: GET_CLIENTS, payload: clients});
      this.ngRedux.dispatch({type: LOAD_CLIENTS_SUCCESS });
    })
    .catch((error) => {
      const message = this.utilsService.getErrorMessage(error);
      this.ngRedux.dispatch({type: LOAD_CLIENTS_ERROR });
    });
  }
}
