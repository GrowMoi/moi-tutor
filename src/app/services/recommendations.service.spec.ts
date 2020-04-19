import { TestBed, inject } from '@angular/core/testing';

import { RecommendationsService } from './recommendations.service';
import { HttpService } from './http.service';
import { NgRedux } from '@angular-redux/store';
import { MockNgRedux } from 'src/__mocks__/ng-redux.mock';
import { UtilsService } from './utils.service';
import { MockUtilsService } from 'src/__mocks__/utils.service.mock';
import { MockHttpService } from 'src/__mocks__/http.service.mock';
import { ToastService } from './toast.service';
import { MockToastService } from 'src/__mocks__/toast.service.mock';
import { MoiTutorState } from '../store';
import { LOAD_ACHIEVEMENTS_SUCCESS, LOAD_ACHIEVEMENTS } from '../actions';

describe('RecommendationsService', () => {
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
    const service: RecommendationsService = TestBed.get(RecommendationsService);
    expect(service).toBeTruthy();
  });

  it('should get achievements', inject([HttpService], async (httpService: HttpService) => {

    const service: RecommendationsService = TestBed.get(RecommendationsService);
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


    await service.getAchievements();

    expect(options).toEqual({
      method: 'get',
      url: '/tutor/dashboard/achievements',
    });
  }));

  it('should add achievements to the store', inject([HttpService, NgRedux], async (
    httpService: HttpService,
    ngRedux: NgRedux<MoiTutorState>
  ) => {

    const service: RecommendationsService = TestBed.get(RecommendationsService);
    let options = null;
    spyOn(httpService, 'http').and.callFake((apiOptions) => {
      options = apiOptions;
      return new Promise((resolve: any) => {
        const response = {
          data: [
            {
              id: 30,
              tutor_id: 5902,
              name: 'recompensa 1',
              description: 'description',
              image: {
                url: null
              }
            }
          ]
        };
        resolve(response);
      });
    });

    const spy = spyOn(ngRedux, 'dispatch');

    await service.getAchievements();

    const calls =  spy.calls.all();

    expect(calls[0].args[0]).toEqual({type: LOAD_ACHIEVEMENTS });
    expect(calls[1].args[0]).toEqual({
      type: LOAD_ACHIEVEMENTS_SUCCESS,
      payload: [
        {
          id: 30,
          tutor_id: 5902,
          name: 'recompensa 1',
          description: 'description',
          image: {
            url: null
          }
        }
      ]
    });
  }));
});
