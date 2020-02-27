import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { IntroPage } from './intro.page';
import { IonicStorageModule } from '@ionic/storage';

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
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IntroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
