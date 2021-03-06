import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizzesCardComponent } from './quizzes-card.component';
import { CardComponent } from '../card/card.component';

describe('QuizzesCardComponent', () => {
  let component: QuizzesCardComponent;
  let fixture: ComponentFixture<QuizzesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuizzesCardComponent,
        CardComponent,
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
