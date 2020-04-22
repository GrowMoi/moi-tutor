import { Observable } from 'rxjs';

export class MockClientsService {
  getClients() {
  }

  sendRequestToClients() {
    return new Observable((subscriber) => {
      subscriber.next();
      subscriber.complete();
    });
  }
}
