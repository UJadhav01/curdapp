import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { StudentRecords} from 'src/app/models/studentRecord.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students?: StudentRecords[];
  currentStudent?: StudentRecords;
  currentIndex = -1;
  collageName = '';

  constructor(private _studentService: StudentService) { }

  ngOnInit(): void {
    this.retrieveStudentList();
  }

  refreshList(): void {
    this.currentStudent = undefined;
    this.currentIndex = -1;
    this.retrieveStudentList();
  }

  retrieveStudentList(): void {
    this._studentService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.students = data;
    });
  }

  setActiveStudent(stud: StudentRecords, index: number): void {
    this.currentStudent = stud;
    this.currentIndex = index;
  }



  removeAllStudRecords(): void {
    this._studentService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
}
