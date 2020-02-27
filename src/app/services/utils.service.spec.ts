import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';
import { IonicStorageModule } from '@ionic/storage';

describe('UtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      IonicStorageModule.forRoot()
    ]
  }));
  it('should be created', () => {
    const service: UtilsService = TestBed.get(UtilsService);
    expect(service).toBeTruthy();
  });
});
