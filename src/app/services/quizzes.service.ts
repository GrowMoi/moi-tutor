import { Injectable } from '@angular/core';
import { LOAD_LEVELS, LOAD_LEVELS_SUCCESS, LOAD_LEVELS_ERROR } from '../actions';
import { HttpService } from './http.service';
import { UtilsService } from './utils.service';
import { ToastService } from './toast.service';
import { MoiTutorState } from '../store';
import { NgRedux } from '@angular-redux/store';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(
    private httpService: HttpService,
    private toastService: ToastService,
    private utilsService: UtilsService,
    private ngRedux: NgRedux<MoiTutorState>,
  ) { }

  getLevels() {
    this.ngRedux.dispatch({ type: LOAD_LEVELS });
    return this.httpService.http({
      method: 'get',
      url: '/tutor/dashboard/get_level_quizzes',
    })
      .then((response) => {
        const levels = response.data && response.data.data ? response.data.data : response.data;
        this.ngRedux.dispatch({ type: LOAD_LEVELS_SUCCESS, payload: levels });
        return response.data;
      })
      .catch((error) => {
        const message = this.utilsService.getErrorMessage(error);
        this.ngRedux.dispatch({ type: LOAD_LEVELS_ERROR });
        return Promise.reject(error);
      });
  }
}
