import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['Number', 'Name', 'Symbol', 'Date', 'Actions'];
  dataSource: any[] = [];
  form: FormGroup;
  myArray: TypedObject[] = [];
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      parts: this._formBuilder.array([]),
    });
    this.initFormArray(this.dataSource);
  }

  initFormArray(dataSource: any[]) {
    const formArray = this.form.get('parts') as FormArray;

    this.dataSource.map((item) => formArray.push(this.createFormGroup(item)));
  }
  createFormGroup(item: any): FormGroup {
    let formGroup: FormGroup = new FormGroup({
      number: new FormControl(item.Number),
      name: new FormControl(item.Name),
      symbol: new FormControl(item.Symbol),
      date: new FormControl(item.Date),
    });
    return formGroup;
  }

  delete(row: any) {
    this.dataSource = this.dataSource.filter((x) => x.Number !== row.Number);
  }

  data(event: ClipboardEvent) {
    this.dataSource.length = 0;
    let clipboardData = event.clipboardData || (<any>window).clipboardData; //typecasting to any

    let pastedText: string = clipboardData.getData('text');
    let row_data: string[] = pastedText.split('\n');

    // Create table dataSource
    let data: any = [];

    row_data.forEach((row_data) => {
      let row: any = {};
      this.displayedColumns.forEach((a, index) => {
        row[a] = row_data.split('\t')[index];
      });
      data.push(row);
    });

    // data.forEach((element: any) => {
    //   this.myArray.push({ number: 1, name: '', symbol: '', date: new Date() });
    // });

    this.dataSource = data;
    this.initFormArray(this.dataSource);
  }
}

export interface TypedObject {
  number: number;
  name: string;
  symbol: string;
  date: Date;
}
