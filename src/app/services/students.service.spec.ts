import { TestBed, inject } from '@angular/core/testing';

import { StudentsService } from './students.service';
import { IonicStorageModule } from '@ionic/storage';
import { NgRedux } from '@angular-redux/store';
import { MockNgRedux } from 'src/__mocks__/ng-redux.mock';
import { UtilsService } from './utils.service';
import { MockUtilsService } from 'src/__mocks__/utils.service.mock';
import { HttpService } from './http.service';
import { MockHttpService } from 'src/__mocks__/http.service.mock';
import { MockToastService } from 'src/__mocks__/toast.service.mock';
import { ToastService } from './toast.service';
import { MoiTutorState } from '../store';
import { START_CANCEL_TUTOR_REQUEST, CANCEL_TUTOR_REQUEST_SUCCESS, START_EXPORT_EXCEL, EXPORT_EXCEL_SUCCESS } from '../actions';

describe('StudentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      IonicStorageModule.forRoot()
    ],
    providers: [{
      provide: NgRedux,
      useFactory: MockNgRedux.getInstance
    }, {
      provide: UtilsService,
      useClass: MockUtilsService
    }, {
      provide: HttpService,
      useClass: MockHttpService
    }, {
      provide: ToastService,
      useClass: MockToastService
    }],
  }));

  it('should be created', inject([UtilsService], (utilsService: UtilsService) => {
    const service: StudentsService = TestBed.get(StudentsService);
    expect(service).toBeTruthy();
  }));

  it('should call to the Cancel Request endpoint', inject([HttpService], async (httpService: HttpService) => {

    const service: StudentsService = TestBed.get(StudentsService);
    let options = null;
    spyOn(httpService, 'http').and.callFake((apiOptions) => {
      options = apiOptions;
      return new Promise((resolve: any) => {
        const response = {
          data: {
            message: 'success'
          }
        };
        resolve(response);
      });
    });

    const params = {
      id: 1342
    };

    await service.cancelRequest(params);

    expect(options).toEqual({
      method: 'delete',
      url: '/tutor/user_tutors/1342',
      data: {
        id: 1342
      }
    });
  }));

  it('should show message on Cancel Request success', inject([HttpService, ToastService], async (
    httpService: HttpService,
    toastService: ToastService,
    ) => {

    spyOn(httpService, 'http').and.callFake((apiOptions) => {
      return new Promise((resolve: any) => {
        const response = {
          data: {
            message: 'a success message'
          }
        };
        resolve(response);
      });
    });

    const spy = spyOn(toastService, 'success').and.callFake(() => {
      return new Promise((resolve: any) => {
        resolve();
      });
    });

    const service: StudentsService = TestBed.get(StudentsService);

    const params = {
      id: 1342
    };

    await service.cancelRequest(params);

    expect(spy.calls.first().args[0]).toBe('a success message');
  }));

  it('should show message on Cancel Request error', inject([
      HttpService,
      ToastService,
      UtilsService
    ], async (
      httpService: HttpService,
      toastService: ToastService,
      utilsService: UtilsService
    ) => {

    spyOn(httpService, 'http').and.callFake((apiOptions) => {
      return new Promise((resolve: any, reject: any) => {
        const response = {
          data: {
            message: 'a error message'
          }
        };
        reject(response);
      });
    });

    spyOn(utilsService, 'getErrorMessage').and.callFake((response) => {
      return response.data.message;
    });

    const spy = spyOn(toastService, 'danger').and.callFake(() => {
      return new Promise((resolve: any) => {
        resolve();
      });
    });

    const service: StudentsService = TestBed.get(StudentsService);

    const params = {
      id: 1342
    };

    await service.cancelRequest(params);

    expect(spy.calls.first().args[0]).toBe('a error message');
  }));

  it('should show message on Cancel Request error', inject([
    HttpService,
    NgRedux,
  ], async (
    httpService: HttpService,
    ngRedux: NgRedux<MoiTutorState>
  ) => {
    const spy = spyOn(ngRedux, 'dispatch');
    spyOn(httpService, 'http').and.callFake((apiOptions) => {
      return new Promise((resolve: any) => {
        const response = {
          data: {
            message: 'a success message'
          }
        };
        resolve(response);
      });
    });

    const service: StudentsService = TestBed.get(StudentsService);

    const params = {
      id: 1342
    };

    await service.cancelRequest(params);

    const calls = spy.calls.all();
    expect(calls[0].args[0]).toEqual({ type: START_CANCEL_TUTOR_REQUEST });
    expect(calls[1].args[0]).toEqual({ type: CANCEL_TUTOR_REQUEST_SUCCESS, payload: params });
  }));

  it('should call to the "Export All Students to Excel" endpoint', inject([
    HttpService,
    NgRedux
  ], async (
    httpService: HttpService,
    ngRedux: NgRedux<MoiTutorState>
  ) => {

    const service: StudentsService = TestBed.get(StudentsService);
    let options = null;
    spyOn(httpService, 'http').and.callFake((apiOptions) => {
      options = apiOptions;
      return new Promise((resolve: any) => {
        const response = {
          data: {
            message: 'success'
          }
        };
        resolve(response);
      });
    });
    const spy = spyOn(ngRedux, 'dispatch');
    service.exportToExcel().subscribe((resp) => {

      const calls = spy.calls.all();

      expect(options).toEqual({
        method: 'get',
        url: '/tutor/dashboard/download_tutor_analytics.xls',
      });
      expect(calls[0].args[0]).toEqual({ type: START_EXPORT_EXCEL });
      expect(calls[1].args[0]).toEqual({ type: EXPORT_EXCEL_SUCCESS });

    });
  }));

});
