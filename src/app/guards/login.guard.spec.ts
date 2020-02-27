import { TestBed, async, inject } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { AppRoutingModule } from '../app-routing.module';
import { IonicStorageModule } from '@ionic/storage';

describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard],
      imports: [
        AppRoutingModule,
        IonicStorageModule.forRoot()
      ]
    });
  });

  it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
