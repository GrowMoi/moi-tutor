import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'moi-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private router: Router,
    private storage: Storage,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
  }

  async logout() {
    await this.storage.clear();
    this.profileService.resetState();
    this.router.navigateByUrl('/login');
  }

}
