import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ClientsState } from 'src/app/reducers/clients';

@Component({
  selector: 'moi-clients-card',
  templateUrl: './clients-card.component.html',
  styleUrls: ['./clients-card.component.scss'],
})
export class ClientsCardComponent implements OnInit {

  @select(['clients', 'data']) clients$: Observable<ClientsState>;
  @select(['clients', 'loading']) loading$: Observable<ClientsState>;

  constructor(private clientsService: ClientsService) { }

  ngOnInit() {
    this.clientsService.getClients();
  }

}
