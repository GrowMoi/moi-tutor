import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ClientsState } from 'src/app/reducers/clients';
import _ from 'lodash';
import { FormatPipe } from 'src/app/pipes/format.pipe';

@Component({
  selector: 'moi-clients-card',
  templateUrl: './clients-card.component.html',
  styleUrls: ['./clients-card.component.scss'],
})
export class ClientsCardComponent implements OnInit {

  clients = [];
  @select(['clients', 'data']) clients$: Observable<ClientsState>;
  @select(['clients', 'loading']) loading$: Observable<ClientsState>;

  selectedClients = [];

  constructor(
    private clientsService: ClientsService,
    private formatPipe: FormatPipe
  ) { }

  ngOnInit() {
    this.clientsService.getClients();
    this.clients$.subscribe((data) => {
      if (!_.isEmpty(data)) {
        const arrayData =  this.formatPipe.transform(_.cloneDeep(data));
        this.clients = this.clients.concat(arrayData);
      }
    });
  }

  selectClient(client) {
    const itemIndex = this.selectedClients.indexOf(client);
    const itemExists = itemIndex >= 0;
    if (itemExists) {
      client.selected = false;
      this.selectedClients.splice(itemIndex, 1);
    } else {
      client.selected = true;
      this.selectedClients.push(client);
    }
  }

}
