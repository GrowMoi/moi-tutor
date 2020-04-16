import { TestBed, inject } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { NgRedux } from '@angular-redux/store';
import { MockNgRedux } from 'src/__mocks__/ng-redux.mock';
import { MoiTutorState } from '../store';
import { USER_LOGOUT } from '../actions/user';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{
      provide: NgRedux,
      useFactory: MockNgRedux.getInstance
    }]
  }));

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });

  it('should clear the state', inject([NgRedux], (ngRedux: NgRedux<MoiTutorState>) => {
    const spy = spyOn(ngRedux, 'dispatch');
    const service: ProfileService = TestBed.get(ProfileService);
    service.resetState();
    expect(spy.calls.first().args[0]).toEqual({ type: USER_LOGOUT });
  }));
});
