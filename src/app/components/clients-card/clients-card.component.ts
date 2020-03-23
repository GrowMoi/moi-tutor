import { Component, OnInit } from '@angular/core';
import { ClientsService, ClientParams } from 'src/app/services/clients.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ClientsState } from 'src/app/reducers/clients';
import _ from 'lodash';
import { FormatPipe } from 'src/app/pipes/format.pipe';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'moi-clients-card',
  templateUrl: './clients-card.component.html',
  styleUrls: ['./clients-card.component.scss'],
})
export class ClientsCardComponent implements OnInit {

  @select(['clients', 'data']) clients$: Observable<ClientsState>;
  @select(['clients', 'loading']) loading$: Observable<ClientsState>;
  @select(['clients', 'sending']) sending$: Observable<ClientsState>;
  params: ClientParams = {
    page: '1',
    search: '',
  };
  clients = [];
  selectedClients = [];

  constructor(
    private clientsService: ClientsService,
    private formatPipe: FormatPipe,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.clientsService.getClients(this.params);
    this.clients$.subscribe((data) => {
      if (!_.isEmpty(data)) {
        const arrayData =  this.formatPipe.transform(_.cloneDeep(data));
        this.clients = arrayData;
      }
    });
  }

  selectClient(client: any) {
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

  sendSelectedClients() {
    const apiParams = {
      user_ids: this.selectedClients.map<number>(item => item.id)
    };

    this.clientsService.sendRequestToClients(apiParams)
      .subscribe({
        next: async (message: string) => {
          this.selectedClients = [];
          const toast = await this.toastController.create({
            message,
            color: 'success',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        },
        error:  async (message: string) => {
          const toast = await this.toastController.create({
            message,
            color: 'danger',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      });
  }

  searchClients(event: any) {
    const { value = '' } = event.detail || {};
    this.selectedClients = [];
    this.params.search = value;
    this.clientsService.getClients(this.params);
  }

}
