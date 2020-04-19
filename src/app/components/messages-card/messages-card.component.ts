import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentsState } from 'src/app/reducers/students';
import { select } from '@angular-redux/store';
import { StudentsService } from 'src/app/services/students.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessagesService, SendMessageData } from 'src/app/services/messages.service';
@Component({
  selector: 'moi-messages-card',
  templateUrl: './messages-card.component.html',
  styleUrls: ['./messages-card.component.scss'],
})
export class MessagesCardComponent implements OnInit {

  @select(['students', 'data']) students$: Observable<StudentsState>;

  messagesForm: FormGroup;
  fileToUpload: File = null;

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
  ) {
    this.messagesForm = this.formBuilder.group({
      student: new FormControl(''),
      send_to_all: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      videoUrl: new FormControl(''),
    });
  }

  ngOnInit() {
    this.studentsService.getStudents();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  sendMessage(data: any) {

    const formData: SendMessageData = {
      ...data,
      send_to_all: !!data.send_to_all,
      imageFile: this.fileToUpload
    };

    this.messagesService.sendMessage(formData);
  }

}
