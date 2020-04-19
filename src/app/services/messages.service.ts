import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

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
    private httpService: HttpService
  ) { }

  async sendMessage(data: SendMessageData) {
    const formData: FormData = new FormData();
    const now = Date.now();
    formData.append('notification[students][]', `${data.student}`);
    formData.append('notification[send_to_all]', `${data.send_to_all}`);
    formData.append('notification[title]', data.title);
    formData.append('notification[description]', data.description);
    formData.append('notification[notification_videos_attributes][0][url]', data.videoUrl);
    formData.append(`notification[notification_medium_attributes][${now}][media]`, data.imageFile, data.imageFile.name);
    formData.append(`notification[notification_medium_attributes][${now}][media_cache]`, '');

    return this.httpService.http({
      method: 'post',
      url: '/tutor/dashboard/send_notification',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'}
    })
      .then((response) => {

      })
      .catch((error) => {

      });
  }
}
