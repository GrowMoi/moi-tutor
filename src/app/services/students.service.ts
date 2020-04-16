import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { UtilsService } from './utils.service';
import { NgRedux } from '@angular-redux/store';
import { MoiTutorState } from '../store';
import {
  GET_STUDENTS,
  LOAD_STUDENTS,
  LOAD_STUDENTS_SUCCESS,
  LOAD_STUDENTS_ERROR,
  START_CANCEL_TUTOR_REQUEST,
  CANCEL_TUTOR_REQUEST_SUCCESS,
  CANCEL_TUTOR_REQUEST_ERROR,
  START_EXPORT_EXCEL,
  EXPORT_EXCEL_SUCCESS,
  EXPORT_EXCEL_ERROR} from '../actions';
import { ToastService } from './toast.service';
import { Observable } from 'rxjs';

export interface StudentCancelRequestData {
  id: number;
}
@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    private httpService: HttpService,
    private toastService: ToastService,
    private utilsService: UtilsService,
    private ngRedux: NgRedux<MoiTutorState>,
  ) { }

  getStudents() {
    this.ngRedux.dispatch({ type: LOAD_STUDENTS });
    return this.httpService.http({
      method: 'get',
      url: '/tutor/dashboard/students'
    })
      .then((response) => {
        const students = response.data && response.data.data ? response.data.data : response.data;
        this.ngRedux.dispatch({ type: GET_STUDENTS, payload: students });
        this.ngRedux.dispatch({ type: LOAD_STUDENTS_SUCCESS });
      })
      .catch((error) => {
        const message = this.utilsService.getErrorMessage(error);
        this.ngRedux.dispatch({ type: LOAD_STUDENTS_ERROR });
      });
  }

  cancelRequest(params: StudentCancelRequestData) {
    this.ngRedux.dispatch({ type: START_CANCEL_TUTOR_REQUEST });
    return this.httpService.http({
      method: 'delete',
      url: `/tutor/user_tutors/${params.id}`,
      data: {
        id: params.id
      }
    })
      .then((response: any) => {
        const message = response.data && response.data.message ? response.data.message : response.data;
        this.ngRedux.dispatch({ type: CANCEL_TUTOR_REQUEST_SUCCESS, payload: params });
        this.toastService.success(message);
      })
      .catch((error: any) => {
        const message = this.utilsService.getErrorMessage(error);
        this.ngRedux.dispatch({ type: CANCEL_TUTOR_REQUEST_ERROR });
        this.toastService.danger(message);
      });
  }

  exportToExcel(studentIds?: Array<number>) {
    this.ngRedux.dispatch({ type: START_EXPORT_EXCEL });
    this.toastService.info('Generando documento...');
    return new Observable((subscriber) => {
      this.httpService.http({
        method: 'get',
        url: '/tutor/dashboard/download_tutor_analytics.xls',
      })
        .then((response: any) => {
          this.ngRedux.dispatch({ type: EXPORT_EXCEL_SUCCESS });
          subscriber.next(response.data);
          subscriber.complete();
        })
        .catch((error: any) => {
          const message = this.utilsService.getErrorMessage(error);
          this.toastService.danger(message);
          this.ngRedux.dispatch({ type: EXPORT_EXCEL_ERROR });
          subscriber.error(message);
        });
    });
  }
}
