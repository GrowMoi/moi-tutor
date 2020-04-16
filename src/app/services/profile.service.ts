import { Injectable } from '@angular/core';
import { MoiTutorState } from '../store';
import { NgRedux } from '@angular-redux/store';
import { USER_LOGOUT } from '../actions/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private ngRedux: NgRedux<MoiTutorState>) { }

  resetState() {
    this.ngRedux.dispatch({ type: USER_LOGOUT });
  }
}
