import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentsState, Student } from 'src/app/reducers/students';
import { select, ObservableStore } from '@angular-redux/store';
import { StudentsService } from 'src/app/services/students.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessagesService, SendMessageData } from 'src/app/services/messages.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'moi-messages-card',
  templateUrl: './messages-card.component.html',
  styleUrls: ['./messages-card.component.scss'],
})
export class MessagesCardComponent implements OnInit {

  @select(['students', 'data']) students$: ObservableStore<Student[]>;
  @select(['messages', 'sending']) sending$: Observable<boolean>;
  @ViewChild('imageFile', {static: false}) imageFile: any;

  messagesForm: FormGroup;
  fileToUpload: File = null;
  students: Student[];

  validationMessages = {
    title: [
      {type: 'required', message: 'Este campo es requerido'}
    ],
    description: [
      {type: 'required', message: 'Este campo es requerido'}
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private studentsService: StudentsService,
    private messagesService: MessagesService,
    private loadingService: LoadingService,
  ) {
    this.messagesForm = this.formBuilder.group({
      student: new FormControl(''),
      sendToAll: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      videoUrl: new FormControl(''),
    });
  }

  ngOnInit() {
    this.studentsService.getStudents();
    this.students$.subscribe((students = []) => {
      this.students = students.filter(item => item.status === 'accepted');
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  async sendMessage(data: any) {

    const formData: SendMessageData = {
      ...data,
      sendToAll: !!data.sendToAll,
      imageFile: this.fileToUpload
    };

    const loading = await this.loadingService.present('Enviando datos...');
    await this.messagesService.sendMessage(formData);
    await loading.dismiss();
    this.resetMessageForm();
  }

  resetMessageForm() {
    this.messagesForm.reset();
    this.fileToUpload = null;
    this.imageFile.value = null;
  }

}
