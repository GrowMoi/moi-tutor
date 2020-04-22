import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
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
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { MockLoadingService } from 'src/__mocks__/loading.service.mock';

interface ClientSendRequestData {
  user_ids: number[];
}

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
        }, {
          provide: LoadingService,
          useClass: MockLoadingService
        }
      ],
    }).compileComponents();

    MockNgRedux.getSelectorStub('students.data');
    fixture = TestBed.createComponent(ClientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    MockNgRedux.reset();
  }));

  beforeEach(() => {
    component.clients = [
      {
        id: 1,
        email: 'test1@example.com',
        name: 'usuario 1',
        role: 'tutor',
        username: 'usuario1',
        image: {
          url: 'http://test.com/image1.jpg'
        }
      },
      {
        id: 2,
        email: 'test2@example.com',
        name: 'usuario 2',
        role: 'tutor',
        username: 'usuario2',
        image: {
          url: 'http://test.com/image2.jpg'
        }
      },
      {
        id: 3,
        email: 'test3@example.com',
        name: 'usuario 3',
        role: 'tutor',
        username: 'usuario3',
        image: {
          url: 'http://test.com/image3.jpg'
        }
      },
      {
        id: 4,
        email: 'test4@example.com',
        name: 'usuario 4',
        role: 'tutor',
        username: 'usuario4',
        image: {
          url: 'http://test.com/image4.jpg'
        }
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get clients on init', inject([ClientsService], (clientsService: ClientsService) => {
    const spy = spyOn(clientsService, 'getClients');
    component.ngOnInit();
    expect(spy.calls.first().args[0]).toEqual({
      page: 1,
      search: '',
    });

  }));

  it('should add the selected clients to list', () => {
    component.selectClient(component.clients[1]);
    component.selectClient(component.clients[2]);
    expect(component.selectedClients.length).toBe(2);
    expect(component.selectedClients).toContain({
      ...component.clients[1],
      selected: true
    });
    expect(component.selectedClients).toContain({
      ...component.clients[2],
      selected: true
    });
  });

  it('should remove the selected clients in the list', () => {
    component.selectClient(component.clients[0]);
    component.selectClient(component.clients[1]);
    component.selectClient(component.clients[2]);

    component.selectClient(component.clients[2]); // Select again

    expect(component.selectedClients.length).toBe(2);
    expect(component.selectedClients).toContain({
      ...component.clients[0],
      selected: true
    });
    expect(component.selectedClients).toContain({
      ...component.clients[1],
      selected: true
    });
    expect(component.clients[2].selected).toBe(false);
  });

  it('should send the selected clients ids', inject([ClientsService], async (clientsService: ClientsService) => {

    const spy = spyOn(clientsService, 'sendRequestToClients').and.callFake((data: ClientSendRequestData) => {
      return new Observable(subscriber => {
        subscriber.next('a message');
        subscriber.complete();
      });
    });

    component.selectClient(component.clients[0]);
    component.selectClient(component.clients[1]);
    component.selectClient(component.clients[2]);
    await component.sendSelectedClients();

    const apiParams = {
      user_ids: [1, 2, 3]
    };

    expect(spy.calls.first().args[0]).toEqual(apiParams);
    expect(component.selectedClients).toEqual([]);

  }));

  it('should clean the selected clients list', inject([ClientsService], async (clientsService: ClientsService) => {

    spyOn(clientsService, 'sendRequestToClients').and.callFake((data: ClientSendRequestData) => {
      return new Observable(subscriber => {
        subscriber.next('a message');
        subscriber.complete();
      });
    });

    component.selectClient(component.clients[0]);
    component.selectClient(component.clients[1]);
    component.selectClient(component.clients[2]);

    await component.sendSelectedClients();

    expect(component.selectedClients).toEqual([]);
    expect(component.clients[0].selected).toEqual(false);
    expect(component.clients[1].selected).toEqual(false);
    expect(component.clients[2].selected).toEqual(false);

  }));

});
