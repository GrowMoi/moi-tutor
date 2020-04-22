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
import { LoadingService } from 'src/app/services/loading.service';
import { MockLoadingService } from 'src/__mocks__/loading.service.mock';

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
      }, {
        provide: LoadingService,
        useClass: MockLoadingService
      }]
    }).compileComponents();

    MockNgRedux.getSelectorStub('students.data');

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

  it('should build data before call sendRecommendation', inject([
    RecommendationsService
  ], async (recommendationsService: RecommendationsService) => {
    component.students = [
      {
        id: 1,
        email: 'test1@example.com',
        name: 'usuario 1',
        username: 'usuario1',
        status: 'accepted'
      },
      {
        id: 2,
        email: 'test2@example.com',
        name: 'usuario 2',
        username: 'usuario2',
        status: 'accepted'
      },
      {
        id: 3,
        email: 'test3@example.com',
        name: 'usuario 3',
        username: 'usuario3',
        status: 'accepted'
      },
    ];
    const spy = spyOn(recommendationsService, 'sendRecommendation');
    await component.sendRecommendation({
      sendToAll: true,
      contents: [123, 456],
      achievement: 6,
    });
    const params = spy.calls.first().args[0];
    expect(params).toEqual({
      achievement: 6,
      contents: [123, 456],
      students: [1, 2, 3]
    });
  }));
});
