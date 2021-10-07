import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-close-dialog',
  templateUrl: './close-dialog.component.html',
  styleUrls: ['./close-dialog.component.scss']
})
export class CloseDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CloseDialogComponent>) {
    dialogRef.disableClose = true;
   }

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close(false);
  }
  Yes()
  {
    this.dialogRef.close("yes");
  }
}
