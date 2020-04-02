import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'moi-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  cards = [
    {
      key: 'clients',
      icon: 'people-outline',
    },
    {
      key: 'students',
      icon: 'body-outline'
    },
    {
      key: 'messages',
      icon: 'chatbox-outline'
    },
    {
      key: 'quizzes',
      icon: 'clipboard-outline'
    },
    {
      key: 'recommendations',
      icon: 'help-buoy-outline'
    },
  ];

  selectedTab = this.cards[0].key;

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event) {
    const value = event.detail.value;
    this.selectedTab = value;
  }

}
