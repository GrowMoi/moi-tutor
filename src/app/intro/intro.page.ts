import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private router: Router, private storage: Storage) { }

  finish() {
    this.storage.set(environment.IS_INTRO_SHOWED_KEY, true);
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
  }

}
