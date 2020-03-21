import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentsCardComponent } from './students-card.component';
import { CardComponent } from '../card/card.component';
import { FormatPipe } from 'src/app/pipes/format.pipe';
import { IonicStorageModule } from '@ionic/storage';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { MockNgRedux } from '../../../__mocks__/ng-redux.mock';
import { StudentsService } from 'src/app/services/students.service';
import { MockStudentsService } from '../../../__mocks__/students.service.mock';

describe('StudentsCardComponent', () => {
  let component: StudentsCardComponent;
  let fixture: ComponentFixture<StudentsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        StudentsCardComponent,
        FormatPipe,
      ],
      imports: [
        NgReduxModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot()
      ],
      providers: [{
        provide: NgRedux,
        useFactory: MockNgRedux.getInstance
      },
      {
        provide: StudentsService,
        useClass: MockStudentsService
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    MockNgRedux.reset();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
