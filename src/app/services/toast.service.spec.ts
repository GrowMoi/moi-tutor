import { TestBed, inject } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { ToastController } from '@ionic/angular';
import { MockToastController } from 'src/__mocks__/toast.controller.mock';

describe('ToastService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{
      provide: ToastController,
      useClass: MockToastController
    }]
  }));

  it('should be created', () => {
    const service: ToastService = TestBed.get(ToastService);
    expect(service).toBeTruthy();
  });

  it('should build a toast for Info', inject([ToastController], (toastController: ToastController) => {
    const spy = spyOn(toastController, 'create').and.callFake(() => {
      return Promise.resolve({
        present: (): Promise<void> => {
          return Promise.resolve();
        }
      } as HTMLIonToastElement);
    });
    const service: ToastService = TestBed.get(ToastService);
    service.info('a message');
    expect(spy.calls.first().args[0]).toEqual({
      message: 'a message',
      color: 'secondary',
      duration: 3000,
      position: 'top',
    });
  }));
});
