import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { CardComponent } from '../components/card/card.component';
import { ClientsCardComponent } from '../components/clients-card/clients-card.component';
import { IonicStorageModule } from '@ionic/storage';
import { NgReduxModule } from '@angular-redux/store';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardPage,
        CardComponent,
        ClientsCardComponent,
      ],
      imports: [
        NgReduxModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
