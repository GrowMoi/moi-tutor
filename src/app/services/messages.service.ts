import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { SENDING_MESSAGE, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_ERROR } from '../actions';
import { ToastService } from './toast.service';
import { UtilsService } from './utils.service';
import { MoiTutorState } from '../store';
import { NgRedux } from '@angular-redux/store';

export interface SendMessageData {
  student: number;
  send_to_all: boolean;
  title: string;
  description: string;
  imageFile: File;
  videoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private httpService: HttpService,
    private toastService: ToastService,
    private utilsService: UtilsService,
    private ngRedux: NgRedux<MoiTutorState>,
  ) { }

  async sendMessage(data: SendMessageData) {
    const formData: FormData = new FormData();
    const now = Date.now();
    formData.append('notification[students][]', `${data.student}`);
    formData.append('notification[send_to_all]', `${data.send_to_all}`);
    formData.append('notification[title]', data.title);
    formData.append('notification[description]', data.description);

    if (data.videoUrl) {
      formData.append('notification[notification_videos_attributes][0][url]', data.videoUrl);
    }

    if (data.imageFile) {
      formData.append(`notification[notification_medium_attributes][${now}][media]`, data.imageFile, data.imageFile.name);
      formData.append(`notification[notification_medium_attributes][${now}][media_cache]`, '');
    }

    this.ngRedux.dispatch({ type: SENDING_MESSAGE });
    return this.httpService.http({
      method: 'post',
      url: '/tutor/dashboard/send_notification',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((response) => {
        this.ngRedux.dispatch({ type: SEND_MESSAGE_SUCCESS });
        const message = response.data && response.data.message ? response.data.message : response.data;
        this.toastService.success(message);
        return response.data;
      })
      .catch((error) => {
        const message = this.utilsService.getErrorMessage(error);
        this.ngRedux.dispatch({ type: SEND_MESSAGE_ERROR });
        this.toastService.danger(message);
        return Promise.reject(error);
      });
  }
}
