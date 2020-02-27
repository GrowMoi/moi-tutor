import { TestBed } from '@angular/core/testing';

import { AuthenticateService } from './authenticate.service';
import { IonicStorageModule } from '@ionic/storage';

describe('AuthenticateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      IonicStorageModule.forRoot()
    ]
  }));

  it('should be created', () => {
    const service: AuthenticateService = TestBed.get(AuthenticateService);
    expect(service).toBeTruthy();
  });
});
