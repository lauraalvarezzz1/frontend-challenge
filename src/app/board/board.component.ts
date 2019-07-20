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
  enableUndo: boolean;
  thereIsWinner: boolean;
  lastColumn: number;
  lastRow: number;
  pieces: number;
  counterPieces: number;

  constructor(private formBuilder: FormBuilder) {
    this.connectForm = this.formBuilder.group({
      n: ['', [Validators.required, Validators.min(4), Validators.max(10)]]
  });
   }

  ngOnInit() {
    this.counterPieces = 0;
    this.showTable = false;
    this.enableUndo = false;
    this.thereIsWinner = false;
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
    this.pieces = (5 * this.connectForm.value.n + 1) * 2;
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

  dropPiece(rows, columns) {
    this.counterPieces += 1;
    this.enableUndo = true;
    if (this.controlTable && this.matrix[rows][columns] === 0) {
      this.controlTable = false;
      this.matrix[rows][0] = this.selectPlayer;
      this.activePice(rows, 1);
      if (this.thereIsWinner) {
        this.enableUndo = false;
      } else {
        this.enableUndo = true;
      }
    }
  }

  activePice(rows, columns) {
    if (typeof this.matrix[rows][columns] !== 'undefined' && this.matrix[rows][columns] === 0 && columns <= this.columns) {
      this.matrix[rows][columns - 1] = 0;
      this.matrix[rows][columns] = this.selectPlayer;
      this.activePice(rows, columns + 1);
    } else {
      this.validateWinner(rows, columns - 1);
      this.controlTable = true;
      if (this.selectPlayer === 'player2') {
        this.selectPlayer = 'player1';
      } else {
        this.selectPlayer = 'player2';
      }
    }
  }

  validateWinner(rows, columns) {
    this.lastRow = rows;
    this.lastColumn = columns;
    console.log(this.matrix);
    this.checkVertical(rows);
    this.checkHorizontal(columns);
    this.checkDiagonalFromLeft(rows, columns);
    this.checkDiagonalFromRight(rows, columns);
    this.validatePieces();
  }

  checkVertical(rows) {
    let count = 1;
    for (let i = 0; i < this.columns; i++) {
      if (this.matrix[rows][i - 1] !== undefined
        && this.matrix[rows][i] !== 0
        && this.matrix[rows][i] === this.matrix[rows][i - 1]) {
        count = count + 1;
        if (count === this.connectForm.value.n) {
          this.thereIsWinner = true;
          console.log ('gana jugador', count);
          console.log(this.selectPlayer);
        }
      } else {
        count = 1;
      }
    }
  }

  checkHorizontal(columns) {
    let count = 1;
    for (let i = 0; i < this.rows; i++) {
      if (this.matrix[i - 1] !== undefined
        && this.matrix[i][columns] !== 0
        && this.matrix[i][columns] === this.matrix[i - 1][columns]) {
            count = count + 1;
            if (count === this.connectForm.value.n) {
              this.thereIsWinner = true;
              console.log ('gana jugador', count);
              console.log(this.selectPlayer);
            }
      } else {
        count = 1;
      }
    }
  }

  checkDiagonalFromLeft(rows, columns) {
    let count = 1;
    while (rows !== 0 && columns !== 0) {
      rows -= 1;
      columns -= 1;
    }

    while (rows !== this.rows && columns !== this.columns) {
      if (this.matrix[rows - 1] !== undefined
        && this.matrix[rows][columns - 1] !== undefined
        && this.matrix[rows][columns] !== 0
        && this.matrix[rows][columns] === this.matrix[rows - 1][columns - 1]) {
            count = count + 1;
            if (count === this.connectForm.value.n) {
              this.thereIsWinner = true;
              console.log ('gana jugador', count);
              console.log(this.selectPlayer);
            }
        } else {
          count = 1;
      }
      rows += 1;
      columns += 1;
    }
  }

  checkDiagonalFromRight(rows, columns) {
    let count = 1;
    while (rows !== 0 && columns !== this.columns) {
      rows -= 1;
      columns += 1;
    }

    while (rows !== this.rows && columns !== 0) {
      if (this.matrix[rows - 1] !== undefined
        && this.matrix[rows][columns + 1] !== undefined
        && this.matrix[rows][columns] !== 0
        && this.matrix[rows][columns] === this.matrix[rows - 1][columns + 1]) {
            count = count + 1;
            if (count === this.connectForm.value.n) {
              this.thereIsWinner = true;
              console.log ('gana jugador', count);
              console.log(this.selectPlayer);
            }
        } else {
          count = 1;
      }
      rows += 1;
      columns -= 1;
    }
  }

  validatePieces() {
    if (this.pieces === this.counterPieces) {
      console.log('empate');
    }
  }

  undoLastPlay() {
    this.matrix[this.lastRow][this.lastColumn] = 0;
    this.counterPieces = this.counterPieces - 1;
    this.enableUndo = false;
    if (this.selectPlayer === 'player2') {
      this.selectPlayer = 'player1';
    } else {
      this.selectPlayer = 'player2';
    }
  }

  resetTable() {
    this.showTable = false;
    this.matrix = [];
    this.clicked = false;
    this.selectPlayer = 'player1';
    this.connectForm.reset();
    this.counterPieces = 0;
  }
}
