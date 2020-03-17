import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { StudentsState } from 'src/app/reducers/students';

@Component({
  selector: 'moi-students-card',
  templateUrl: './students-card.component.html',
  styleUrls: ['./students-card.component.scss'],
})
export class StudentsCardComponent implements OnInit {

  @select(['students', 'data']) students$: Observable<StudentsState>;
  @select(['students', 'loading']) loading$: Observable<StudentsState>;

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.studentsService.getStudents();
  }

}
