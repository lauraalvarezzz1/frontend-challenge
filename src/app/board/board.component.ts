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
  controlTable = true;
  selectPlayer: string;

  constructor(private formBuilder: FormBuilder) {
    this.connectForm = this.formBuilder.group({
      n: ['', [Validators.required, Validators.min(4), Validators.max(10)]]
  });
   }

  ngOnInit() {
    this.showTable = false;
    this.matrix = [];
    this.selectPlayer = 'player1';
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
    this.initMatrix();
  }

  initMatrix() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.matrix[i][j] = 0;
      }
    }
    console.log(this.matrix);
  }

  resetTable() {
    this.showTable = false;
    this.matrix = [];
    this.clicked = false;
    this.connectForm.reset();
  }

  dropPiece(rows, columns) {
    if (this.controlTable && this.matrix[rows][columns] === 0) {
      this.controlTable = false;
      this.activePice(rows, 1);
      console.log(this.matrix);
    }
  }

  activePice(rows, columns) {
    if (typeof this.matrix[rows][columns] !== 'undefined' && this.matrix[rows][columns] === 0 && columns < this.columns) {
      this.matrix[rows][columns - 1] = 0;
      this.matrix[rows][columns] = this.selectPlayer;
      this.activePice(rows, columns + 1);
    } else {
      this.selectPlayer = this.selectPlayer === 'player1' ? 'player2' : 'player1';
      this.controlTable = true;
    }

  }

}
