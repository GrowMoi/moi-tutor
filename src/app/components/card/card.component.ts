import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'moi-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() title: string;
  @Input() theme: string;

  themes = {
    'light-blue': {
      cssClass: 'card-light-blue'
    },
    'light-green': {
      cssClass: 'card-light-green'
    },
    yellow: {
      cssClass: 'card-light-yellow'
    },
    pink: {
      cssClass: 'card-light-pink'
    },
    red: {
      cssClass: 'card-light-red'
    },
    default: {
      cssClass: 'card-default'
    }
  };

  selectedCssClass = {};

  constructor() {
  }

  ngOnInit() {
    const theme = this.themes[this.theme];
    this.selectedCssClass = (theme || this.themes.default).cssClass;
  }

}
