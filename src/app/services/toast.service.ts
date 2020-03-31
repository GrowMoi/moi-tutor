import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }

  async success(message: string, config: any = {}) {
    const toast = await this.toastController.create({
      message,
      color: 'success',
      duration: 3000,
      position: 'top',
      ...config
    });
    toast.present();
  }

  async danger(message: string, config: any = {}) {
    const toast = await this.toastController.create({
      message,
      color: 'danger',
      duration: 3000,
      position: 'top',
      ...config
    });
    toast.present();
  }
}
