import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { StudentRecords} from '../models/studentRecord.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private dbPath = '/Student-Records';


  studentRef: AngularFireList<StudentRecords>;

  constructor(private db: AngularFireDatabase) {
    this.studentRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<StudentRecords> {
    return this.studentRef;
  }

  create(stud: StudentRecords): any {
    return this.studentRef.push(stud);
  }

  update(key: string, value: any): Promise<void> {
    return this.studentRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.studentRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.studentRef.remove();
  }
}
