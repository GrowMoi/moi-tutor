import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { Student } from 'src/app/reducers/students';
import { ObservableStore, select } from '@angular-redux/store';

@Component({
  selector: 'moi-quizzes-card',
  templateUrl: './quizzes-card.component.html',
  styleUrls: ['./quizzes-card.component.scss'],
})
export class QuizzesCardComponent implements OnInit {

  @select(['students', 'data']) students$: ObservableStore<Student[]>;
  students: Student[];

  constructor(
    private studentsService: StudentsService,
  ) { }

  ngOnInit() {
    this.studentsService.getStudents();
    this.students$.subscribe((students = []) => {
      this.students = students.filter(item => item.status === 'accepted');
    });
  }

}
