import { Component, OnInit } from '@angular/core';
import { StudentsService, StudentCancelRequestData } from 'src/app/services/students.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { StudentsState, Student } from 'src/app/reducers/students';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'moi-students-card',
  templateUrl: './students-card.component.html',
  styleUrls: ['./students-card.component.scss'],
})
export class StudentsCardComponent implements OnInit {

  @select(['students', 'data']) students$: Observable<StudentsState>;
  @select(['students', 'loading']) loading$: Observable<StudentsState>;

  constructor(
    private studentsService: StudentsService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.studentsService.getStudents();
  }


  async confirmCancelRequest(student: Student) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: 'Realmente desea cancelar esta solicitud?',
      buttons: [
        {
          text: 'Sí',
          handler: () => this.cancelRequest(student)
        },
        {
          text: 'Regresar',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });

    await alert.present();
  }

  cancelRequest(student: Student) {
    const params: StudentCancelRequestData = {
      id: student.id
    };
    this.studentsService.cancelRequest(params);
  }

}
