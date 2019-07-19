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

  constructor(private formBuilder: FormBuilder) {
    this.connectForm = this.formBuilder.group({
      n: ['', [Validators.required, Validators.min(4), Validators.max(10)]]
  });
   }

  ngOnInit() {
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
    if (this.controlTable && this.matrix[rows][columns] === 0) {
      this.controlTable = false;
      this.matrix[rows][0] = this.selectPlayer;
      this.activePice(rows, 1);
      this.validateWinner(rows);

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
      this.controlTable = true;
      if (this.selectPlayer === 'player2') {
        this.selectPlayer = 'player1';
      } else {
        this.selectPlayer = 'player2';
      }
    }
  }

  validateWinner(rows) {
    console.log(this.matrix);

    // Check Vertical
    let playerOne = 0;
    const playerTwo = 0;
    for (let i = 0; i < this.columns; i++) {
      if (this.matrix[rows][i] === 'player1') {
        playerOne = playerOne + 1;
      } else {
        playerOne = 0;
      }

      if (playerOne === this.connectForm.value.n) {
        console.log ('gana jugador 1', playerOne);
      }
    }

    console.log(playerOne, '2', playerTwo);
  }

  undoLastPlay(rows, columns) {
    console.log(this.matrix);
  }

  resetTable() {
    this.showTable = false;
    this.matrix = [];
    this.clicked = false;
    this.connectForm.reset();
  }
}
