import { Component, OnInit } from '@angular/core';
import { StudentRecords} from 'src/app/models/studentRecord.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  student: StudentRecords = new StudentRecords();
  submitted = false;

  constructor(private _studentService: StudentService) { }

  ngOnInit(): void {
  }

  saveStudRecords(): void {
    this._studentService.create(this.student).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;

    });
  }

  newStudRecord(): void {
    this.submitted = false;
    this.student = new StudentRecords();
  }
}
