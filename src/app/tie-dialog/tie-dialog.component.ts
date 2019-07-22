import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tie-dialog',
  templateUrl: './tie-dialog.component.html',
  styleUrls: ['./tie-dialog.component.scss']
})
export class TieDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TieDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  startAgainDialog() {
    this.dialogRef.close();
  }

}
