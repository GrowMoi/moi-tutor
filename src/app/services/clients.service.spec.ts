import { TestBed } from '@angular/core/testing';

import { ClientsService } from './clients.service';
import { IonicStorageModule } from '@ionic/storage';
import { NgReduxModule } from '@angular-redux/store';

describe('ClientsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      IonicStorageModule.forRoot(),
      NgReduxModule
    ]
  }));
  it('should be created', () => {
    const service: ClientsService = TestBed.get(ClientsService);
    expect(service).toBeTruthy();
  });
});
