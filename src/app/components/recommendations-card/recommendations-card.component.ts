import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { Student } from 'src/app/reducers/students';
import { StudentsService } from 'src/app/services/students.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Achievement } from 'src/app/reducers/recommendations';
import { RecommendationsService } from 'src/app/services/recommendations.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'moi-recommendations-card',
  templateUrl: './recommendations-card.component.html',
  styleUrls: ['./recommendations-card.component.scss'],
})
export class RecommendationsCardComponent implements OnInit {

  @select(['students', 'data']) students$: Observable<Student[]>;
  @select(['recommendations', 'achievements']) achievements$: Observable<Array<Achievement>>;
  @select(['recommendations', 'contents']) contents$: Observable<Array<Content>>;
  @select(['recommendations', 'loadingContents']) loadingContents$: Observable<boolean>;
  @select(['recommendations', 'sending']) sending$: Observable<boolean>;

  recommendationsForm: FormGroup;
  students: Student[];
  sendToAll: boolean;
  student: number;

  constructor(
    private studentsService: StudentsService,
    private formBuilder: FormBuilder,
    private recommendationsService: RecommendationsService,
    private loadingService: LoadingService,
  ) {
    this.recommendationsForm = this.formBuilder.group({
      student: new FormControl(''),
      sendToAll: new FormControl(''),
      achievement: new FormControl(''),
      contents: new FormControl(''),
    });
   }

  ngOnInit() {
    this.studentsService.getStudents();
    this.recommendationsService.getAchievements();
    this.students$.subscribe((students = []) => {
      this.students = students.filter(item => item.status === 'accepted');
    });
  }

  validateForm(form: any) {
    const userNotSelected = (!form.value.student && !form.value.sendToAll);
    const invalidForm = !form.valid;
    const achievementNotSelected =  form.value.achievement === '';
    return invalidForm || userNotSelected || achievementNotSelected;
  }

  async sendRecommendation(data) {
    const formData = {
      ...data
    };

    if (formData.sendToAll) {
      formData.students = this.students.map(item => item.id);
    } else {
      formData.students = [formData.student];
    }

    delete formData.sendToAll;
    delete formData.student;

    const loading = await this.loadingService.present('Enviando datos...');
    await this.recommendationsService.sendRecommendation(formData);
    await loading.dismiss();
  }

  loadContentsForAll(isChecked: boolean) {
    if (isChecked) {
      this.recommendationsService.getContents();
    } else {
      this.recommendationsService.cleanContents();
    }
  }

  loadContentsForStudent(studentId: number) {
    this.recommendationsService.getContents(studentId);
  }

}
