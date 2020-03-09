import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientsCardComponent } from './clients-card.component';
import { CardComponent } from '../card/card.component';
import { IonicStorageModule } from '@ionic/storage';
import { NgReduxModule } from '@angular-redux/store';

describe('ClientsCardComponent', () => {
  let component: ClientsCardComponent;
  let fixture: ComponentFixture<ClientsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClientsCardComponent,
        CardComponent
      ],
      imports: [
        NgReduxModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
