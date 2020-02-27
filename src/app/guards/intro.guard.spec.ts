import { TestBed, async, inject } from '@angular/core/testing';

import { IntroGuard } from './intro.guard';
import { IonicStorageModule } from '@ionic/storage';
import { AppRoutingModule } from '../app-routing.module';

describe('IntroGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntroGuard],
      imports: [
        AppRoutingModule,
        IonicStorageModule.forRoot()
      ]
    });
  });

  it('should ...', inject([IntroGuard], (guard: IntroGuard) => {
    expect(guard).toBeTruthy();
  }));
});
