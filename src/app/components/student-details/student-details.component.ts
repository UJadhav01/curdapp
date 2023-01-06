import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';
import { StudentRecords} from 'src/app/models/studentRecord.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  @Input() student?: StudentRecords;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentStudent: StudentRecords = {
    collageName: '',
    stream: '',
    id:0,
    fullName:'',
  };
  message = '';

  constructor(private _studentService: StudentService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentStudent = { ...this.student };
  }


  updateStudRecord(): void {
    const data = {

      id:this.currentStudent.id,
      fullName:this.currentStudent.fullName,
      title: this.currentStudent.collageName,
      description: this.currentStudent.stream,

    };

    if (this.currentStudent.key) {
      this._studentService.update(this.currentStudent.key, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteStudRecord(): void {
    if (this.currentStudent.key) {
      this._studentService.delete(this.currentStudent.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}
