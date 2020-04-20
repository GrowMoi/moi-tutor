import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
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

  it('should call getContents when select option 1', inject([RecommendationsService], (recommendationsService: RecommendationsService) => {
    const spy = spyOn(recommendationsService, 'getContents');
    component.loadContentsForAll(true);
    expect(spy).toHaveBeenCalled();
  }));

  it('should call getContents when select option 2', inject([RecommendationsService], (recommendationsService: RecommendationsService) => {
    const spy = spyOn(recommendationsService, 'cleanContents');
    component.loadContentsForAll(false);
    expect(spy).toHaveBeenCalled();
  }));

  it('should call getContents when select option 3', inject([RecommendationsService], (recommendationsService: RecommendationsService) => {
    const spy = spyOn(recommendationsService, 'getContents');
    component.loadContentsForStudent(3456);
    const params = spy.calls.first().args[0];
    expect(params).toBe(3456);
  }));
});
