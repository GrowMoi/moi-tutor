import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { IntroPage } from './intro.page';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { MockRouter } from '../../__mocks__/router.mock';
import { MockStorage } from 'src/__mocks__/storage.mock';

describe('IntroPage', () => {
  let component: IntroPage;
  let fixture: ComponentFixture<IntroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroPage ],
      imports: [
        IonicStorageModule.forRoot(),
        RouterTestingModule,
        IonicModule.forRoot()
      ],
      providers: [{
        provide: Router,
        useClass: MockRouter
      }, {
        provide: Storage,
        useClass: MockStorage
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(IntroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigateByUrl should be called', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    component.finish();
    expect(spy.calls.first().args[0]).toBe('/home');
  }));

  it('should storage the intro showed value', inject([Storage], (storage: Storage) => {
    const spy = spyOn(storage, 'set');
    component.finish();
    expect(spy.calls.first().args[0]).toBe(environment.IS_INTRO_SHOWED_KEY);
    expect(spy.calls.first().args[1]).toBe(true);
  }));
});
