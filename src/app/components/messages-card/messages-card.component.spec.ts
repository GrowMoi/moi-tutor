import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagesCardComponent } from './messages-card.component';
import { CardComponent } from '../card/card.component';
import { StudentsService } from 'src/app/services/students.service';
import { MockStudentsService } from 'src/__mocks__/students.service.mock';
import { MessagesService } from 'src/app/services/messages.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('MessagesCardComponent', () => {
  let component: MessagesCardComponent;
  let fixture: ComponentFixture<MessagesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MessagesCardComponent,
        CardComponent,
      ],
      providers: [{
        provide: StudentsService,
        useClass: MockStudentsService
      }],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get students on init', inject([StudentsService], (studentsService: StudentsService) => {
    const spy = spyOn(studentsService, 'getStudents');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  }));

  it('should call "send message"',
    inject([StudentsService, MessagesService],
    (
      studentsService: StudentsService,
      messagesService: MessagesService
    ) => {
    const spy = spyOn(messagesService, 'sendMessage');
    const formData = {
      student: 6199,
      send_to_all: false,
      title: 'a title',
      description: 'a description',
    };
    component.sendMessage(formData);
    expect(spy).toHaveBeenCalled();
  }));
});
