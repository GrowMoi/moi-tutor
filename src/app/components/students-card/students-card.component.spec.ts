import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { IonicModule, AlertController } from '@ionic/angular';

import { StudentsCardComponent } from './students-card.component';
import { CardComponent } from '../card/card.component';
import { FormatPipe } from 'src/app/pipes/format.pipe';
import { IonicStorageModule } from '@ionic/storage';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { MockNgRedux } from '../../../__mocks__/ng-redux.mock';
import { StudentsService } from 'src/app/services/students.service';
import { MockStudentsService } from '../../../__mocks__/students.service.mock';
import { MockAlertController } from 'src/__mocks__/alert.controller.mock';
import { Student } from 'src/app/reducers/students';

describe('StudentsCardComponent', () => {
  let component: StudentsCardComponent;
  let fixture: ComponentFixture<StudentsCardComponent>;
  let students: Array<Student>;

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
      },
      {
        provide: AlertController,
        useClass: MockAlertController
      },
    ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    MockNgRedux.reset();
  }));

  beforeEach(() => {
    students = [
      {
        id: 1,
        email: 'test1@example.com',
        name: 'usuario 1',
        username: 'usuario1',
        status: 'accepted'
      },
      {
        id: 2,
        email: 'test2@example.com',
        name: 'usuario 2',
        username: 'usuario2',
        status: 'accepted'
      },
      {
        id: 3,
        email: 'test3@example.com',
        name: 'usuario 3',
        username: 'usuario3',
        status: null
      },
      {
        id: 4,
        email: 'test4@example.com',
        name: 'usuario 4',
        username: 'usuario4',
        status: null
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get students on init', inject([StudentsService], (studentsService: StudentsService) => {
    const spy = spyOn(studentsService, 'getStudents');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();

  }));

  it('should show an alert before cancel request',  inject([AlertController], async (alertController: AlertController) => {
    const spy = spyOn(alertController, 'create').and.callFake((opts?: any) => {
      return Promise.resolve({
          present: (): Promise<void> => {
              return Promise.resolve();
          }
      } as HTMLIonAlertElement);
    });

    await component.confirmCancelRequest(students[0]);
    const params = spy.calls.first().args[0];

    expect(params.header).toBe('Advertencia');
    expect(params.message).toBe('Realmente desea cancelar esta solicitud?');
  }));

  it('should call to the handler when select ok', inject([AlertController, StudentsService],
    async (alertController: AlertController, studentsService: StudentsService) => {
    let options = null;
    const spy = spyOn(studentsService, 'cancelRequest');
    spyOn(alertController, 'create').and.callFake((opts?: any) => {
      options = opts;
      return Promise.resolve({
          present: (): Promise<void> => {
              return Promise.resolve();
          }
      } as HTMLIonAlertElement);
    });

    await component.confirmCancelRequest(students[1]);
    options.buttons[0].handler();

    const params = spy.calls.first().args[0];

    expect(params).toEqual({
      id: 2
    });

  }));
});
