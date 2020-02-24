import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'moi-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pages = [
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
  ];

  selectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.selectedPath = event.url;
      }
    });
  }

}
