import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }

  async present(message: string, options?: any) {
    const loading = await this.loadingController.create({
      message,
      ...options
    });
    await loading.present();
    return loading;
  }
}
