import { TestBed, inject } from '@angular/core/testing';

import { MessagesService } from './messages.service';
import { HttpService } from './http.service';
import { MockHttpService } from 'src/__mocks__/http.service.mock';
import { ToastService } from './toast.service';
import { MockToastService } from 'src/__mocks__/toast.service.mock';
import { NgRedux } from '@angular-redux/store';
import { MockNgRedux } from 'src/__mocks__/ng-redux.mock';
import { MoiTutorState } from '../store';
import { SENDING_MESSAGE, SEND_MESSAGE_SUCCESS } from '../actions';

describe('MessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{
      provide: NgRedux,
      useFactory: MockNgRedux.getInstance
    }, {
      provide: HttpService,
      useClass: MockHttpService
    }, {
      provide: ToastService,
      useClass: MockToastService
    }],
  }));

  it('should be created', () => {
    const service: MessagesService = TestBed.get(MessagesService);
    expect(service).toBeTruthy();
  });

  it('should build form data', inject([
      HttpService,
      ToastService,
    ], async (
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

    const spyFormData = spyOn(FormData.prototype, 'append');

    spyOn(toastService, 'success').and.callFake(() => {
      return new Promise((resolve: any) => {
        resolve();
      });
    });

    const service: MessagesService = TestBed.get(MessagesService);
    const file = new File(['foo', 'bar'], 'foobar.jpg');
    const data = {
      student: 129,
      send_to_all: false,
      title: 'a title',
      description: 'a description',
      imageFile: file,
      videoUrl: 'https://www.youtube.com/watch?v=xHQ1tupbNv8',
    };
    await service.sendMessage(data);

    const calls = spyFormData.calls.all();
    const now = Date.now();
    expect(calls[0].args[0]).toEqual('notification[students][]');
    expect(calls[0].args[1]).toEqual(`${data.student}`);
    expect(calls[1].args[0]).toEqual('notification[send_to_all]');
    expect(calls[1].args[1]).toEqual(`${data.send_to_all}`);
    expect(calls[2].args[0]).toEqual('notification[title]');
    expect(calls[2].args[1]).toEqual(data.title);
    expect(calls[3].args[0]).toEqual('notification[description]');
    expect(calls[3].args[1]).toEqual(data.description);
    expect(calls[4].args[0]).toEqual('notification[notification_videos_attributes][0][url]');
    expect(calls[4].args[1]).toEqual(data.videoUrl);
    expect(calls[5].args[0]).toContain('notification[notification_medium_attributes]');
    expect(calls[5].args[1]).toEqual(data.imageFile);
    expect(calls[5].args[2]).toEqual(data.imageFile.name);
    expect(calls[6].args[0]).toContain('notification[notification_medium_attributes]');
    expect(calls[6].args[1]).toEqual('');
  }));

  it('should build form data without image', inject([
    HttpService,
    ToastService,
  ], async (
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

  const spyFormData = spyOn(FormData.prototype, 'append');

  spyOn(toastService, 'success').and.callFake(() => {
    return new Promise((resolve: any) => {
      resolve();
    });
  });

  const service: MessagesService = TestBed.get(MessagesService);
  const data = {
    student: 129,
    send_to_all: false,
    title: 'a title',
    description: 'a description',
    imageFile: null,
    videoUrl: 'https://www.youtube.com/watch?v=xHQ1tupbNv8',
  };
  await service.sendMessage(data);

  const calls = spyFormData.calls.all();
  const now = Date.now();
  expect(calls[0].args[0]).toEqual('notification[students][]');
  expect(calls[0].args[1]).toEqual(`${data.student}`);
  expect(calls[1].args[0]).toEqual('notification[send_to_all]');
  expect(calls[1].args[1]).toEqual(`${data.send_to_all}`);
  expect(calls[2].args[0]).toEqual('notification[title]');
  expect(calls[2].args[1]).toEqual(data.title);
  expect(calls[3].args[0]).toEqual('notification[description]');
  expect(calls[3].args[1]).toEqual(data.description);
  expect(calls[4].args[0]).toEqual('notification[notification_videos_attributes][0][url]');
  expect(calls[4].args[1]).toEqual(data.videoUrl);
}));

  it('should update the state when sending data', inject([
    HttpService,
    NgRedux,
    ToastService,
  ], async (
    httpService: HttpService,
    ngRedux: NgRedux<MoiTutorState>,
    toastService: ToastService,
  ) => {
    const spyNgRedux = spyOn(ngRedux, 'dispatch');
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

    const spyToast = spyOn(toastService, 'success').and.callFake(() => {
      return new Promise((resolve: any) => {
        resolve();
      });
    });

    const service: MessagesService = TestBed.get(MessagesService);
    const file = new File(['foo', 'bar'], 'foobar.jpg');
    const data = {
      student: 129,
      send_to_all: false,
      title: 'a title',
      description: 'a description',
      imageFile: file,
      videoUrl: 'https://www.youtube.com/watch?v=xHQ1tupbNv8',
    };
    await service.sendMessage(data);

    const calls = spyNgRedux.calls.all();
    expect(calls[0].args[0]).toEqual({ type: SENDING_MESSAGE });
    expect(calls[1].args[0]).toEqual({ type: SEND_MESSAGE_SUCCESS });
    expect(spyToast.calls.first().args[0]).toBe('a success message');
  }));
});
