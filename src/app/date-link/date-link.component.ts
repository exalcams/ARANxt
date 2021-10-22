import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpaceService } from '../space/space.service';
import { DateLink } from '../space/spacemodel';

@Component({
  selector: 'app-date-link',
  templateUrl: './date-link.component.html',
  styleUrls: ['./date-link.component.scss']
})
export class DateLinkComponent implements OnInit {
  DateLinkForm: FormGroup;
  DateLinkView: DateLink = new DateLink();

  constructor(public dialog: MatDialog, private service: SpaceService,public dialogRef: MatDialogRef<DateLinkComponent>, public form: FormBuilder) { }

  ngOnInit(): void {
    this.InitialiseDateForm();
  }
  InitialiseDateForm() {
    this.DateLinkForm = this.form.group({
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      Time: ['', [Validators.required]],
      TimeStamp: ['', [Validators.required]],
    });
  }
  close(): void {
    this.dialogRef.close();
  }
  Save(){
    this.DateLinkView.Date = this.DateLinkForm.get('StartDate').value;
    this.DateLinkView.Item = "Site";
    this.DateLinkView.Time =this.DateLinkForm.get('StartDate').value;
    this.DateLinkView.TimeStamp = this.DateLinkForm.get('TimeStamp').value;
    this.dialogRef.close(this.DateLinkView)
    // this.service.DateLink(this.DateLinkView).subscribe((x) => {
    //   console.log(x);
    //   this.dialogRef.close();
    // },
    //   err => {
    //     console.log(err);
    //     this.dialogRef.close();
    //   })
  }
}
