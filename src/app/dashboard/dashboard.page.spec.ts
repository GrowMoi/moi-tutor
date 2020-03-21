import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { CardComponent } from '../components/card/card.component';
import { ClientsCardComponent } from '../components/clients-card/clients-card.component';
import { StudentsCardComponent } from '../components/students-card/students-card.component';
import { IonicStorageModule } from '@ionic/storage';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { RecommendationsCardComponent } from '../components/recommendations-card/recommendations-card.component';
import { QuizzesCardComponent } from '../components/quizzes-card/quizzes-card.component';
import { MessagesCardComponent } from '../components/messages-card/messages-card.component';
import { FormatPipe } from '../pipes/format.pipe';
import { MockFormatPipe } from 'src/__mocks__/format.pipe.mock';
import { ClientsService } from '../services/clients.service';
import { MockClientsService } from 'src/__mocks__/clients.service.mock';
import { MockNgRedux } from 'src/__mocks__/ng-redux.mock';
import { StudentsService } from '../services/students.service';
import { MockStudentsService } from 'src/__mocks__/students.service.mock';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardPage,
        CardComponent,
        ClientsCardComponent,
        StudentsCardComponent,
        RecommendationsCardComponent,
        QuizzesCardComponent,
        MessagesCardComponent,
        FormatPipe
      ],
      imports: [
        NgReduxModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot()
      ],
      providers: [
        {
          provide: NgRedux,
          useFactory: MockNgRedux.getInstance
        },
        {
          provide: ClientsService,
          useClass: MockClientsService
        },
        {
          provide: StudentsService,
          useClass: MockStudentsService
        },
        {
          provide: FormatPipe,
          useClass: MockFormatPipe
        }
      ],
    }).compileComponents();

    MockNgRedux.getSelectorStub('students.data');
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    MockNgRedux.reset();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
