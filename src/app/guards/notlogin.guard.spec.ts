import { TestBed, async, inject } from '@angular/core/testing';

import { NotloginGuard } from './notlogin.guard';
import { AppRoutingModule } from '../app-routing.module';
import { IonicStorageModule } from '@ionic/storage';

describe('NotloginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotloginGuard],
      imports: [
        AppRoutingModule,
        IonicStorageModule.forRoot()
      ]
    });
  });

  it('should ...', inject([NotloginGuard], (guard: NotloginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
