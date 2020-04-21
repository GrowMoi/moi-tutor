import { Injectable } from '@angular/core';
import { LOAD_LEVELS, LOAD_LEVELS_SUCCESS, LOAD_LEVELS_ERROR, SENDING_QUIZ, SEND_QUIZ_SUCCESS, SEND_QUIZ_ERROR } from '../actions';
import { HttpService } from './http.service';
import { UtilsService } from './utils.service';
import { ToastService } from './toast.service';
import { MoiTutorState } from '../store';
import { NgRedux } from '@angular-redux/store';

export interface QuizzesData {
  level: number;
  student: number;
  sendToAll: boolean;
}
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

  sendQuiz(formData: QuizzesData) {
    this.ngRedux.dispatch({ type: SENDING_QUIZ });
    const data = {
      quiz: {
        level_quiz_id: formData.level,
        client_id: formData.student,
        send_to_all: formData.sendToAll
      }
    };

    return this.httpService.http({
      method: 'post',
      url: '/tutor/dashboard/create_quiz',
      data,
    })
      .then((response) => {
        const message = response.data && response.data.message ? response.data.message : response.data;
        this.ngRedux.dispatch({ type: SEND_QUIZ_SUCCESS });
        this.toastService.success(message);
        return response.data;
      })
      .catch((error) => {
        const message = this.utilsService.getErrorMessage(error);
        this.ngRedux.dispatch({ type: SEND_QUIZ_ERROR });
        this.toastService.danger(message);
        return Promise.reject(error);
      });
  }
}
