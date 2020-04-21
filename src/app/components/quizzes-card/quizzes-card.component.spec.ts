import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizzesCardComponent } from './quizzes-card.component';
import { CardComponent } from '../card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { MockNgRedux } from 'src/__mocks__/ng-redux.mock';
import { StudentsService } from 'src/app/services/students.service';
import { MockStudentsService } from 'src/__mocks__/students.service.mock';

describe('QuizzesCardComponent', () => {
  let component: QuizzesCardComponent;
  let fixture: ComponentFixture<QuizzesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuizzesCardComponent,
        CardComponent,
      ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        IonicStorageModule.forRoot(),
        NgReduxModule,
      ],
      providers: [{
        provide: NgRedux,
        useFactory: MockNgRedux.getInstance
      }, {
        provide: StudentsService,
        useClass: MockStudentsService
      }]
    }).compileComponents();

    MockNgRedux.getSelectorStub('students.data');

    fixture = TestBed.createComponent(QuizzesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load students on init', inject([StudentsService], (studentsService: StudentsService) => {
    const spy = spyOn(studentsService, 'getStudents');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  }));
});
