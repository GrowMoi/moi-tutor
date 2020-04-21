import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { Student } from 'src/app/reducers/students';
import { ObservableStore, select } from '@angular-redux/store';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'moi-quizzes-card',
  templateUrl: './quizzes-card.component.html',
  styleUrls: ['./quizzes-card.component.scss'],
})
export class QuizzesCardComponent implements OnInit {

  @select(['students', 'data']) students$: ObservableStore<Student[]>;
  students: Student[];
  quizzesForm: FormGroup;

  constructor(
    private studentsService: StudentsService,
    private formBuilder: FormBuilder,
  ) {
    this.quizzesForm = this.formBuilder.group({
      student: new FormControl(''),
      sendToAll: new FormControl(''),
      level: new FormControl(''),
    });
  }

  ngOnInit() {
    this.studentsService.getStudents();
    this.students$.subscribe((students = []) => {
      this.students = students.filter(item => item.status === 'accepted');
    });
  }

  validateForm(form: any) {
    const userNotSelected = (!form.value.student && !form.value.sendToAll);
    const invalidForm = !form.valid;
    const levelNotSelected =  !form.value.level;
    return invalidForm || userNotSelected || levelNotSelected;
  }

}
