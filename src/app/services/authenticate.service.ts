import { Injectable } from '@angular/core';
import { MoiTutorState } from '../store';
import { NgRedux } from '@angular-redux/store';
import { LOGIN } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private ngRedux: NgRedux<MoiTutorState>) { }

  loginUser(credentials) {
    return new Promise((resolve, reject) => {
      this.ngRedux.dispatch({type: LOGIN});
      resolve();
    });
  }
}
