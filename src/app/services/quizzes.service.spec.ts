import { TestBed, inject } from '@angular/core/testing';

import { QuizzesService } from './quizzes.service';
import { HttpService } from './http.service';
import { NgRedux } from '@angular-redux/store';
import { MockNgRedux } from 'src/__mocks__/ng-redux.mock';
import { UtilsService } from './utils.service';
import { MockUtilsService } from 'src/__mocks__/utils.service.mock';
import { MockHttpService } from 'src/__mocks__/http.service.mock';
import { ToastService } from './toast.service';
import { MockToastService } from 'src/__mocks__/toast.service.mock';
import { MoiTutorState } from '../store';
import { LOAD_LEVELS, LOAD_LEVELS_SUCCESS, SENDING_QUIZ, SEND_QUIZ_SUCCESS } from '../actions';

describe('QuizzesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
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

  it('should be created', () => {
    const service: QuizzesService = TestBed.get(QuizzesService);
    expect(service).toBeTruthy();
  });

  it('should get levels', inject([HttpService], async (httpService: HttpService) => {

    const service: QuizzesService = TestBed.get(QuizzesService);
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

    await service.getLevels();

    expect(options).toEqual({
      method: 'get',
      url: '/tutor/dashboard/get_level_quizzes',
    });
  }));

  it('should add achievements to the store', inject([HttpService, NgRedux], async (
    httpService: HttpService,
    ngRedux: NgRedux<MoiTutorState>
  ) => {

    const service: QuizzesService = TestBed.get(QuizzesService);
    let options = null;
    spyOn(httpService, 'http').and.callFake((apiOptions) => {
      options = apiOptions;
      return new Promise((resolve: any) => {
        const response = {
          data: [
            {
              id: 30,
              name: 'level 1',
              description: 'description 1',
              content_ids: [
                '1379',
                '980',
                '1382',
                '1376'
              ]
            }
          ]
        };
        resolve(response);
      });
    });

    const spy = spyOn(ngRedux, 'dispatch');

    await service.getLevels();

    const calls =  spy.calls.all();

    expect(calls[0].args[0]).toEqual({type: LOAD_LEVELS });
    expect(calls[1].args[0]).toEqual({
      type: LOAD_LEVELS_SUCCESS,
      payload: [
        {
          id: 30,
          name: 'level 1',
          description: 'description 1',
          content_ids: [
            '1379',
            '980',
            '1382',
            '1376'
          ]
        }
      ]
    });
  }));

  it('should send quiz', inject([HttpService, NgRedux], async (
    httpService: HttpService,
    ngRedux: NgRedux<MoiTutorState>
  ) => {

    const service: QuizzesService = TestBed.get(QuizzesService);
    let options = null;
    spyOn(httpService, 'http').and.callFake((apiOptions) => {
      options = apiOptions;
      return new Promise((resolve: any) => {
        const response = {
          data: {
            message: 'a message'
          }
        };
        resolve(response);
      });
    });

    const spyRedux = spyOn(ngRedux, 'dispatch');

    await service.sendQuiz({
        student: 1,
        level: 345,
        sendToAll: true,
    });

    const calls =  spyRedux.calls.all();
    expect(calls[0].args[0]).toEqual({type: SENDING_QUIZ });
    expect(calls[1].args[0]).toEqual({type: SEND_QUIZ_SUCCESS });
    expect(options).toEqual({
      method: 'post',
      url: '/tutor/dashboard/create_quiz',
      data: {
        quiz: {
          level_quiz_id: 345,
          client_id: 1,
          send_to_all: true
        }
      }
    });
  }));
});
