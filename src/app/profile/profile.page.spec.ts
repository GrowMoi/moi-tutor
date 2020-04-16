import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule, Storage } from '@ionic/storage';

import { ProfilePage } from './profile.page';
import { Router } from '@angular/router';
import { MockRouter } from 'src/__mocks__/router.mock';
import { MockStorage } from 'src/__mocks__/storage.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileService } from '../services/profile.service';
import { MockProfileService } from 'src/__mocks__/profile.service.mock';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePage ],
      providers: [{
        provide: Router,
        useClass: MockRouter
      }, {
        provide: Storage,
        useClass: MockStorage
      }, {
        provide: ProfileService,
        useClass: MockProfileService
      }],
      imports: [
        IonicStorageModule.forRoot(),
        RouterTestingModule,
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear storage and redirect on user logout', inject([Storage, Router], async (storage: Storage, router: Router) => {
    const spyRouter = spyOn(router, 'navigateByUrl');
    const spyStorage = spyOn(storage, 'clear');

    await component.logout();

    expect(spyStorage).toHaveBeenCalled();
    expect(spyRouter.calls.first().args[0]).toBe('/login');

  }));

  it('should reset state on user logout', inject([ProfileService], async (profileService: ProfileService) => {
    const spy = spyOn(profileService, 'resetState');
    await component.logout();
    expect(spy).toHaveBeenCalled();
  }));
});
