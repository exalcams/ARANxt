import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-close-dialog',
  templateUrl: './close-dialog.component.html',
  styleUrls: ['./close-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CloseDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<CloseDialogComponent>,
  ) {
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
