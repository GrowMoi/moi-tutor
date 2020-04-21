import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { Student } from 'src/app/reducers/students';
import { ObservableStore, select } from '@angular-redux/store';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Level } from 'src/app/reducers/quizzes';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'moi-quizzes-card',
  templateUrl: './quizzes-card.component.html',
  styleUrls: ['./quizzes-card.component.scss'],
})
export class QuizzesCardComponent implements OnInit {

  @select(['students', 'data']) students$: ObservableStore<Student[]>;
  @select(['quizzes', 'levels']) levels$: ObservableStore<Level[]>;
  students: Student[];
  levels: Level[];
  quizzesForm: FormGroup;

  constructor(
    private studentsService: StudentsService,
    private formBuilder: FormBuilder,
    private quizzesService: QuizzesService,
  ) {
    this.quizzesForm = this.formBuilder.group({
      student: new FormControl(''),
      sendToAll: new FormControl(''),
      level: new FormControl(''),
    });
  }

  ngOnInit() {
    this.studentsService.getStudents();
    this.quizzesService.getLevels();
    this.students$.subscribe((students = []) => {
      this.students = students.filter(item => item.status === 'accepted');
    });
    this.levels$.subscribe((levels = []) => {
      this.levels = levels;
    });
  }

  validateForm(form: any) {
    const userNotSelected = (!form.value.student && !form.value.sendToAll);
    const invalidForm = !form.valid;
    const levelNotSelected =  !form.value.level;
    return invalidForm || userNotSelected || levelNotSelected;
  }

}
