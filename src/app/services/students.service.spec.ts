import { TestBed } from '@angular/core/testing';

import { StudentsService } from './students.service';
import { IonicStorageModule } from '@ionic/storage';
import { NgRedux } from '@angular-redux/store';
import { MockNgRedux } from 'src/__mocks__/ng-redux.mock';

describe('StudentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      IonicStorageModule.forRoot()
    ],
    providers: [{
      provide: NgRedux,
      useFactory: MockNgRedux.getInstance
    }],
  }));

  it('should be created', () => {
    const service: StudentsService = TestBed.get(StudentsService);
    expect(service).toBeTruthy();
  });
});
