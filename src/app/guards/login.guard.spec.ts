import { TestBed, async, inject } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { AppRoutingModule } from '../app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate.service';
import { MockAuthenticateService } from 'src/__mocks__/authenticate.service.mock';
import { Router } from '@angular/router';
import { MockRouter } from '../../__mocks__/router.mock';

describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        {
          provide: AuthenticateService,
          useClass: MockAuthenticateService
        },
        {
          provide: Router,
          useClass: MockRouter
        }
      ],
      imports: [
        AppRoutingModule,
        IonicStorageModule.forRoot()
      ]
    });
  });

  it('should exists', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should redirect to login if user is not authenticated', inject([LoginGuard, Router], async (guard: LoginGuard, router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    await guard.canActivate();
    expect(spy.calls.first().args[0]).toBe('/login');
  }));
});
