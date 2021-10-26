import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationSnackBarComponent } from 'src/app/notification/notification-snack-bar/notification-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from '../notification/notification-snack-bar/notification-snackbar-status-enum';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FinishComponent implements OnInit {
  notificationSnackBarComponent: NotificationSnackBarComponent;
  constructor(public dialogRef: MatDialogRef<FinishComponent>,public snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
  }
  close(): void {
    this.dialogRef.close();
    // this.notificationSnackBarComponent.openSnackBar('Space Created Successfully', SnackBarStatus.success);
  }
}
