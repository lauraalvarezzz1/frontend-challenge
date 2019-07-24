import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-winner-dialog',
  templateUrl: './winner-dialog.component.html',
  styleUrls: ['./winner-dialog.component.scss']
})
export class WinnerDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<WinnerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  validateWinner: boolean;

  ngOnInit() {
    if (this.data.player === 'player1') {
      this.validateWinner = true;
    } else {
      this.validateWinner = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
