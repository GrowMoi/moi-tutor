import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecommendationsCardComponent } from './recommendations-card.component';
import { CardComponent } from '../card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { MockNgRedux } from 'src/__mocks__/ng-redux.mock';
import { StudentsService } from 'src/app/services/students.service';
import { MockStudentsService } from 'src/__mocks__/students.service.mock';
import { RecommendationsService } from 'src/app/services/recommendations.service';
import { MockRecommendationsService } from 'src/__mocks__/recommendations.service.mock';

describe('RecommendationsCardComponent', () => {
  let component: RecommendationsCardComponent;
  let fixture: ComponentFixture<RecommendationsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecommendationsCardComponent,
        CardComponent,
      ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        IonicStorageModule.forRoot(),
        NgReduxModule,
      ],
      providers: [{
        provide: NgRedux,
        useFactory: MockNgRedux.getInstance
      }, {
        provide: StudentsService,
        useClass: MockStudentsService
      }, {
        provide: RecommendationsService,
        useClass: MockRecommendationsService
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
