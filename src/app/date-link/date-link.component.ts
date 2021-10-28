import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpaceService } from '../space/space.service';
import { DateLink } from '../space/spacemodel';

@Component({
  selector: 'app-date-link',
  templateUrl: './date-link.component.html',
  styleUrls: ['./date-link.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateLinkComponent implements OnInit {
  DateLinkForm: FormGroup;
  DateLinkView: DateLink = new DateLink();
  Obj:any;
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
    this.Obj=[{
      DateLinkView:this.DateLinkView,
      DateLinkForm:this.DateLinkForm.valid
    }]
    this.dialogRef.close(this.Obj);
  }
  Save(){
    this.DateLinkView.date = this.DateLinkForm.get('StartDate').value;
    this.DateLinkView.item = "Site";
    this.DateLinkView.time =this.DateLinkForm.get('StartDate').value;
    this.DateLinkView.timeStamp = this.DateLinkForm.get('TimeStamp').value;
    this.Obj=[{
      DateLinkView:this.DateLinkView,
      DateLinkForm:this.DateLinkForm.valid
    }]
    this.dialogRef.close(this.Obj);
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
