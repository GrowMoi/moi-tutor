import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecommendationsCardComponent } from './recommendations-card.component';
import { CardComponent } from '../card/card.component';

describe('RecommendationsCardComponent', () => {
  let component: RecommendationsCardComponent;
  let fixture: ComponentFixture<RecommendationsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecommendationsCardComponent,
        CardComponent,
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
