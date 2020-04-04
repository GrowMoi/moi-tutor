import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { RouterTestingModule } from '@angular/router/testing';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [
        RouterTestingModule,
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of pages', () => {
    const pages = component.pages;
    expect(pages).toEqual([
      {
        title: 'MOI',
        url: '/tutor/dashboard',
        img: '../../assets/img/moi_navbar_brain.png'
      },
      {
        title: 'Usuario',
        url: '/tutor/client',
        img: '../../assets/img/moi_navbar_client.png'
      },
    ]);
  });
});
