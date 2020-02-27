import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { IonicStorageModule } from '@ionic/storage';

describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      IonicStorageModule.forRoot()
    ]
  }));
  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });
});
