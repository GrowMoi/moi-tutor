import { Component, OnInit } from '@angular/core';
import { StudentsService, StudentCancelRequestData } from 'src/app/services/students.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { StudentsState, Student } from 'src/app/reducers/students';
import { AlertController } from '@ionic/angular';
import _ from 'lodash';

@Component({
  selector: 'moi-students-card',
  templateUrl: './students-card.component.html',
  styleUrls: ['./students-card.component.scss'],
})
export class StudentsCardComponent implements OnInit {

  @select(['students', 'data']) students$: Observable<StudentsState>;
  @select(['students', 'loading']) loading$: Observable<StudentsState>;
  @select(['students', 'sending']) sending$: Observable<boolean>;

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

  exportToExcel() {
    this.studentsService.exportToExcel().subscribe((excelTextDocument: string) => {
      if (excelTextDocument) {
        const fileName = 'reporte_' + Date.now() + '.xls';
        this.downloadReport(excelTextDocument, fileName);
      }
    });
  }

  downloadReport(excelTextDocument: string, fileName: string) {
    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([excelTextDocument], {type: 'application/xls'}));
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}
