import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { UtilsService } from './utils.service';
import { NgRedux } from '@angular-redux/store';
import { MoiTutorState } from '../store';
import { GET_STUDENTS, LOAD_STUDENTS, LOAD_STUDENTS_SUCCESS, LOAD_CLIENTS_ERROR, LOAD_STUDENTS_ERROR } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    private httpService: HttpService,
    private utilsService: UtilsService,
    private ngRedux: NgRedux<MoiTutorState>,
  ) { }

  getStudents() {
    this.ngRedux.dispatch({type: LOAD_STUDENTS });
    return this.httpService.http({
      method: 'get',
      url: '/tutor/dashboard/students'
    })
    .then((response) => {
      const students = response.data && response.data.data ? response.data.data : response.data;
      this.ngRedux.dispatch({type: GET_STUDENTS, payload: students});
      this.ngRedux.dispatch({type: LOAD_STUDENTS_SUCCESS });
    })
    .catch((error) => {
      const message = this.utilsService.getErrorMessage(error);
      this.ngRedux.dispatch({type: LOAD_STUDENTS_ERROR });
    });
  }
}
