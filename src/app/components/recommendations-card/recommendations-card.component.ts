import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { StudentsState } from 'src/app/reducers/students';
import { StudentsService } from 'src/app/services/students.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { RecommendationsState } from 'src/app/reducers/recommendations';
import { RecommendationsService } from 'src/app/services/recommendations.service';

@Component({
  selector: 'moi-recommendations-card',
  templateUrl: './recommendations-card.component.html',
  styleUrls: ['./recommendations-card.component.scss'],
})
export class RecommendationsCardComponent implements OnInit {

  @select(['students', 'data']) students$: Observable<StudentsState>;
  @select(['recommendations', 'achievements']) achievements$: Observable<RecommendationsState>;
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
    });
   }

  ngOnInit() {
    this.studentsService.getStudents();
    this.recommendationsService.getAchievements();
  }

}
