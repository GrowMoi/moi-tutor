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

  it('cards should have 4 items', () => {
    const cards = component.cards;

    expect(cards).toEqual([
      {
        key: 'clients',
        icon: 'people-outline',
      },
      {
        key: 'students',
        icon: 'body-outline'
      },
      {
        key: 'messages',
        icon: 'chatbox-outline'
      },
      {
        key: 'quizzes',
        icon: 'clipboard-outline'
      },
      {
        key: 'recommendations',
        icon: 'help-buoy-outline'
      },
    ]);
  });

  it('selected tab should change when select clients', () => {
    const cards = component.cards;
    const event = {
      detail: {
        value: cards[0].key
      }
    };
    component.segmentChanged(event);
    expect(component.selectedTab).toBe(cards[0].key);
  });

  it('selected tab should change when select students', () => {
    const cards = component.cards;
    const event = {
      detail: {
        value: cards[1].key
      }
    };
    component.segmentChanged(event);
    expect(component.selectedTab).toBe(cards[1].key);
  });


  it('selected tab should change when select messages', () => {
    const cards = component.cards;
    const event = {
      detail: {
        value: cards[2].key
      }
    };
    component.segmentChanged(event);
    expect(component.selectedTab).toBe(cards[2].key);
  });

  it('selected tab should change when select quizzes', () => {
    const cards = component.cards;
    const event = {
      detail: {
        value: cards[3].key
      }
    };
    component.segmentChanged(event);
    expect(component.selectedTab).toBe(cards[3].key);
  });

  it('selected tab should change when select recommendations', () => {
    const cards = component.cards;
    const event = {
      detail: {
        value: cards[4].key
      }
    };
    component.segmentChanged(event);
    expect(component.selectedTab).toBe(cards[4].key);
  });
});
