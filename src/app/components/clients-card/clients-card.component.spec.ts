import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientsCardComponent } from './clients-card.component';
import { CardComponent } from '../card/card.component';
import { IonicStorageModule } from '@ionic/storage';
import { FormatPipe } from 'src/app/pipes/format.pipe';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { MockNgRedux } from '../../../__mocks__/ng-redux.mock';
import { ClientsService } from 'src/app/services/clients.service';
import { MockClientsService } from 'src/__mocks__/clients.service.mock';
import { MockFormatPipe } from 'src/__mocks__/format.pipe.mock';

describe('ClientsCardComponent', () => {
  let component: ClientsCardComponent;
  let fixture: ComponentFixture<ClientsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClientsCardComponent,
        CardComponent,
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
          provide: FormatPipe,
          useClass: MockFormatPipe
        }
      ],
    }).compileComponents();

    MockNgRedux.getSelectorStub('students.data');
    fixture = TestBed.createComponent(ClientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    MockNgRedux.reset();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
