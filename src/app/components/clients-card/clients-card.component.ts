import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService, ClientParams } from 'src/app/services/clients.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ClientsState, Client, ClientMeta } from 'src/app/reducers/clients';
import { IonInfiniteScroll } from '@ionic/angular';
import _ from 'lodash';
import { ToastService } from 'src/app/services/toast.service';

interface InfiniteScrollEvents {
  target: any;
}
@Component({
  selector: 'moi-clients-card',
  templateUrl: './clients-card.component.html',
  styleUrls: ['./clients-card.component.scss'],
})
export class ClientsCardComponent implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  @select(['clients', 'data']) clients$: Observable<ClientsState>;
  @select(['clients', 'meta']) meta$: Observable<ClientMeta>;
  @select(['clients', 'loading']) loading$: Observable<boolean>;
  @select(['clients', 'sending']) sending$: Observable<boolean>;
  params: ClientParams = {
    page: 1,
    search: '',
  };
  clients: Client[];
  selectedClients = [];
  scrollEvents: InfiniteScrollEvents;
  meta: ClientMeta;

  constructor(
    private clientsService: ClientsService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.clientsService.getClients(this.params);
    this.clients$.subscribe((data: any) => {
      if (!_.isEmpty(data)) {
        this.clients = data;
      }

      if (!_.isEmpty(this.scrollEvents)) {
        this.scrollEvents.target.complete();
        const totalPages = this.meta.total_pages;
        if (this.params.page === totalPages) {
          this.scrollEvents.target.disabled = true;
        }
      }
    });

    this.meta$.subscribe((meta: any) => {
      this.meta = meta;
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
          this.toastService.success(message);
        },
        error:  async (message: string) => {
          this.toastService.danger(message);
        }
      });
  }

  searchClients(event: any) {
    const { value = '' } = event.detail || {};
    this.selectedClients = [];
    this.params.page = 1;
    this.params.search = value;
    this.clientsService.searchClients(this.params);
  }

  loadMoreClients(event: InfiniteScrollEvents) {
    const totalPages = this.meta.total_pages;
    if (this.params.page < totalPages) {
      this.scrollEvents = event;
      this.params.page = (this.params.page + 1);
      this.clientsService.getMoreClients(this.params);
    }
  }

}
