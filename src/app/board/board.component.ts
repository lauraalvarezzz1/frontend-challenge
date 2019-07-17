import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  connectForm: FormGroup;
  columns: number;
  rows: number;
  showTable: boolean;
  matrix: any[];
  clicked = false;
  reset = true;

  constructor(private formBuilder: FormBuilder) {
    this.connectForm = this.formBuilder.group({
      n: ['', [Validators.required, Validators.min(4), Validators.max(10)]]
  });
   }

  ngOnInit() {
    this.showTable = false;
    this.matrix = [];
  }

  createTable() {
    this.showTable = false;
    this.setTable();
  }

  setTable() {
    this.columns = (2 * this.connectForm.value.n) - 1;
    this.rows = this.connectForm.value.n + 2;

    for (let i = 0; i < this.rows; i++) {
        this.matrix[i] = new Array(this.columns);
    }

    this.showTable = true;
    this.reset = false;
  }

  resetTable() {
    this.showTable = false;
    this.matrix = [];
    this.clicked = false;
    this.connectForm.reset();
  }

}
