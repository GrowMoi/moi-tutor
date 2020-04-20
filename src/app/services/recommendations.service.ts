import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ToastService } from './toast.service';
import { UtilsService } from './utils.service';
import { MoiTutorState } from '../store';
import { NgRedux } from '@angular-redux/store';
import {
  LOAD_ACHIEVEMENTS,
  LOAD_ACHIEVEMENTS_SUCCESS,
  LOAD_ACHIEVEMENTS_ERROR,
  LOAD_CONTENTS,
  LOAD_CONTENTS_SUCCESS,
  LOAD_CONTENTS_ERROR,
  SENDING_RECOMMENDATIONS,
  SEND_RECOMMENDATIONS_SUCCESS,
  SEND_RECOMMENDATIONS_ERROR
} from '../actions';

export interface RecommendationsData {
  achievement: number;
  contents: number[];
  students: number[];
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  constructor(
    private httpService: HttpService,
    private toastService: ToastService,
    private utilsService: UtilsService,
    private ngRedux: NgRedux<MoiTutorState>,
  ) { }

  getAchievements() {
    this.ngRedux.dispatch({ type: LOAD_ACHIEVEMENTS });
    return this.httpService.http({
      method: 'get',
      url: '/tutor/dashboard/achievements',
    })
      .then((response) => {
        const achievements = response.data && response.data.data ? response.data.data : response.data;
        this.ngRedux.dispatch({ type: LOAD_ACHIEVEMENTS_SUCCESS, payload: achievements });
        return response.data;
      })
      .catch((error) => {
        const message = this.utilsService.getErrorMessage(error);
        this.ngRedux.dispatch({ type: LOAD_ACHIEVEMENTS_ERROR });
        return Promise.reject(error);
      });
  }

  getContents(studentId?: number) {

    const options: any = {
      method: 'get',
      url: '/tutor/dashboard/get_contents',
    };
    if (studentId) {
      options.params = {
        user_id: studentId
      };
    }
    this.ngRedux.dispatch({ type: LOAD_CONTENTS });
    return this.httpService.http(options)
      .then((response) => {
        const contents = response.data && response.data.data ? response.data.data : response.data;
        this.ngRedux.dispatch({ type: LOAD_CONTENTS_SUCCESS, payload: contents });
        return response.data;
      })
      .catch((error) => {
        const message = this.utilsService.getErrorMessage(error);
        this.ngRedux.dispatch({ type: LOAD_CONTENTS_ERROR });
        return Promise.reject(error);
      });
  }

  cleanContents() {
    // TODO
  }

  sendRecommendation(formData: RecommendationsData) {

    this.ngRedux.dispatch({ type: SENDING_RECOMMENDATIONS });
    const data = {
      tutor_recommendation: {
        tutor_achievement: formData.achievement,
        content_tutor_recommendations: formData.contents,
        students: formData.students
      }
    };

    return this.httpService.http({
      method: 'post',
      url: '/tutor/recommendations',
      data,
    })
      .then((response) => {
        const message = response.data && response.data.message ? response.data.message : response.data;
        this.ngRedux.dispatch({ type: SEND_RECOMMENDATIONS_SUCCESS });
        this.toastService.success(message);
        return response.data;
      })
      .catch((error) => {
        const message = this.utilsService.getErrorMessage(error);
        this.ngRedux.dispatch({ type: SEND_RECOMMENDATIONS_ERROR });
        this.toastService.danger(message);
        return Promise.reject(error);
      });

  }
}
