import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { StudentsState } from 'src/app/reducers/students';
import { StudentsService } from 'src/app/services/students.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { RecommendationsState, Achievement } from 'src/app/reducers/recommendations';
import { RecommendationsService } from 'src/app/services/recommendations.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'moi-recommendations-card',
  templateUrl: './recommendations-card.component.html',
  styleUrls: ['./recommendations-card.component.scss'],
})
export class RecommendationsCardComponent implements OnInit {

  @select(['students', 'data']) students$: Observable<StudentsState>;
  @select(['recommendations', 'achievements']) achievements$: Observable<Array<Achievement>>;
  @select(['recommendations', 'contents']) contents$: Observable<Array<Content>>;
  @select(['recommendations', 'loadingContents']) loadingContents$: Observable<boolean>;

  recommendationsForm: FormGroup;

  constructor(
    private studentsService: StudentsService,
    private formBuilder: FormBuilder,
    private recommendationsService: RecommendationsService,
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
  }

  validateForm(form: any) {
    const userNotSelected = (!form.value.student && !form.value.sendToAll);
    const invalidForm = !form.valid;
    const achievementNotSelected =  form.value.achievement === '';
    return invalidForm || userNotSelected || achievementNotSelected;
  }

  sendRecommendation(formData) {
    // TODO
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
