import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shift-confirmation',
  templateUrl: './shift-confirmation.component.html',
  styleUrls: ['./shift-confirmation.component.scss']
})
export class ShiftConfirmationComponent implements OnInit {
  // TextAreaMinRow = 2;
  // TextAreaMaxRow = 2;
  constructor(public dialogRef: MatDialogRef<ShiftConfirmationComponent>,private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    ShiftConformationForm: FormGroup;

  ngOnInit(): void {
    this.SignedFormGroup();
  }
  close(){
    this.dialogRef.close(false);
  }
  SignedFormGroup(): void
{
  this.ShiftConformationForm = this.formBuilder.group({
    Penalty: ['', Validators.required],
    From:['',Validators.required],
    To:['',Validators.required],
    Remarks:['',Validators.required]
  });
}
}
