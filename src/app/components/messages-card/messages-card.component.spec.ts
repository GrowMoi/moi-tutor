import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagesCardComponent } from './messages-card.component';
import { CardComponent } from '../card/card.component';

describe('MessagesCardComponent', () => {
  let component: MessagesCardComponent;
  let fixture: ComponentFixture<MessagesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MessagesCardComponent,
        CardComponent,
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
